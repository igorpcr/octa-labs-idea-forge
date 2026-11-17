// Draft only. Isolated simulation, no Pix, no carrier purchase.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const cors = {"Access-Control-Allow-Origin":"https://octa-labs-idea-forge.lovable.app","Access-Control-Allow-Headers":"authorization,apikey,content-type,x-client-info","Access-Control-Allow-Methods":"POST,OPTIONS","Vary":"Origin"};
const respond=(status:number,body:unknown)=>Response.json(body,{status,headers:{...cors,"Cache-Control":"no-store"}});
Deno.serve(async(req:Request)=>{
 if(req.method==="OPTIONS")return new Response(null,{status:204,headers:cors});
 if(req.method!=="POST")return respond(405,{error:"method_not_allowed"});
 if(req.headers.get("content-type")?.split(";")[0]?.trim()!=="application/json")return respond(415,{error:"content_type"});
 const auth=req.headers.get("Authorization")||"";
 if(!/^Bearer\s+\S+$/.test(auth))return respond(401,{error:"authentication_required"});
 const url=Deno.env.get("SUPABASE_URL"),secret=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
 if(!url||!secret)return respond(503,{error:"not_configured"});
 let payload:unknown;
 try{const raw=await req.text();if(raw.length>5000)return respond(413,{error:"too_large"});payload=JSON.parse(raw)}
 catch{return respond(400,{error:"invalid_json"})}
 if(!payload||typeof payload!=="object"||Array.isArray(payload))return respond(422,{error:"invalid_body"});
 const x=payload as Record<string,unknown>;
 if(Object.keys(x).some(k=>!["idempotencyKey","items","destinationCep"].includes(k))||
 typeof x.idempotencyKey!=="string"||!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(x.idempotencyKey)||
 typeof x.destinationCep!=="string"||!/^\d{8}$/.test(x.destinationCep)||
 !Array.isArray(x.items)||x.items.length<1||x.items.length>30||
 x.items.some((i:unknown)=>!i||typeof i!=="object"||Array.isArray(i)||Object.keys(i).some(k=>!["sku","quantity"].includes(k))||typeof (i as Record<string,unknown>).sku!=="string"||!Number.isInteger((i as Record<string,unknown>).quantity)||Number((i as Record<string,unknown>).quantity)<1||Number((i as Record<string,unknown>).quantity)>99))
 return respond(422,{error:"invalid_cart"});
 const headers={apikey:secret,Authorization:`Bearer ${secret}`,"Content-Type":"application/json"};
 try{
  const userRes=await fetch(`${url}/auth/v1/user`,{headers:{...headers,Authorization:auth},signal:AbortSignal.timeout(8000)});
  if(!userRes.ok)return respond(401,{error:"authentication_required"});
  const user=await userRes.json();if(typeof user?.id!=="string")return respond(401,{error:"authentication_required"});
  const rpc=await fetch(`${url}/rest/v1/rpc/octa_sim_create_order`,{method:"POST",headers,body:JSON.stringify({p_buyer_id:user.id,p_idempotency_key:x.idempotencyKey,p_items:x.items,p_destination_cep:x.destinationCep}),signal:AbortSignal.timeout(10000)});
  if(!rpc.ok){const err=await rpc.json().catch(()=>({}));return respond(err.code==="23505"?409:err.code==="22023"?422:503,{error:err.code==="23505"?"idempotency_conflict":err.code==="22023"?"invalid_or_unavailable_cart":"simulation_unavailable",paymentAvailable:false})}
  const rows=await rpc.json();if(!Array.isArray(rows)||rows.length!==1)return respond(502,{error:"invalid_result"});
  return respond(200,{orderId:rows[0].order_id,created:rows[0].created,totalCents:rows[0].total_cents,documentationStatus:"pending",paymentAvailable:false,shippingStatus:"manual_review",simulation:true});
 }catch{return respond(503,{error:"temporarily_unavailable",paymentAvailable:false})}
});
