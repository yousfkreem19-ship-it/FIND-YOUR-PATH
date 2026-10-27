/* FIND YOUR PATH — transparent rule-based recommendations.
   Real course cards appear only when verified course records are added to COURSES below. */
"use strict";

const FIELDS = [
  {id:"programming",name:"البرمجة وتطوير المواقع",icon:"⌘",tag:"منطق + بناء",description:"حوّل الأفكار إلى مواقع وتطبيقات، وابدأ بفهم أساسيات الويب ثم ابنِ مشروعات حقيقية.",skills:["حل المشكلات","HTML وCSS","JavaScript"],work:"تطوير مواقع الويب، واجهات المستخدم، تطبيقات الويب",first:"ابدأ بـ HTML وCSS، وبعدها تعلّم JavaScript وطبّق على صفحة شخصية.",time:"مسار مناسب للتعلّم التدريجي والممارسة المستمرة."},
  {id:"marketing",name:"التسويق الرقمي والإعلانات",icon:"↗",tag:"تواصل + تحليل",description:"تعلّم الوصول للجمهور المناسب، وصناعة الحملات وقراءة النتائج وتحسينها.",skills:["كتابة المحتوى","تحليل البيانات","إدارة الحملات"],work:"إدارة صفحات، إعلانات رقمية، تسويق بالمحتوى",first:"ابدأ بمبادئ التسويق والجمهور المستهدف، ثم صمّم خطة محتوى تجريبية.",time:"تقدر تبدأ بمشروعات صغيرة وتطوّر مهاراتك مع قياس النتائج."},
  {id:"design",name:"الجرافيك ديزاين",icon:"✳",tag:"إبداع + بصريات",description:"حوّل الرسائل إلى تصاميم واضحة، وتعلّم مبادئ التكوين والألوان والطباعة.",skills:["نظرية الألوان","التكوين","أدوات التصميم"],work:"تصميم منشورات، هويات بصرية، مواد إعلانية",first:"تعلّم مبادئ التصميم أولًا، ثم نفّذ 3 تصاميم تدريبية واطلب ملاحظات عليها.",time:"التطبيق وبناء ملف أعمال أهم من جمع الأدوات وحدها."},
  {id:"content",name:"المونتاج وصناعة المحتوى",icon:"▶",tag:"قصة + إيقاع",description:"تعلّم تحويل اللقطات والأفكار إلى فيديو مفهوم وجذاب يناسب المنصة والجمهور.",skills:["السرد البصري","المونتاج","الصوت والإيقاع"],work:"مونتاج فيديو، صناعة Reels، محتوى تعليمي وتسويقي",first:"ابدأ بقصّ وترتيب المقاطع، ثم تعلّم الصوت والعناوين والإيقاع على فيديو قصير.",time:"يمكن التدرّب على مقاطع قصيرة ومشروعات متكررة."},
  {id:"ai",name:"الذكاء الاصطناعي AI",icon:"✧",tag:"استكشاف + ابتكار",description:"استخدم أدوات الذكاء الاصطناعي لحل مشكلات فعلية، وافهم حدودها وكيفية تقييم مخرجاتها.",skills:["كتابة التعليمات","تقييم النتائج","حل المشكلات"],work:"أتمتة مهام، دعم صناعة المحتوى، نماذج أولية ذكية",first:"ابدأ بمفاهيم AI وكتابة التعليمات، ثم نفّذ مشروعًا صغيرًا وتحقق من نتائجه.",time:"يمكن استكشافه بالتوازي مع مجال أساسي مثل البرمجة أو التسويق."},
  {id:"english",name:"الإنجليزية وتطوير الذات",icon:"Aa",tag:"تواصل + نمو",description:"طوّر اللغة ومهارات التواصل والتنظيم لتسهيل التعلم والعمل والتعامل مع المصادر.",skills:["مفردات عملية","استماع ومحادثة","تنظيم الوقت"],work:"مهارة داعمة لمعظم المجالات وفرص العمل",first:"حدّد هدفًا أسبوعيًا صغيرًا واجمع بين الاستماع والقراءة والممارسة اليومية.",time:"جلسات قصيرة منتظمة أفضل من جلسة طويلة متقطعة."}
];

// أضف هنا فقط كورسات فعلية تم التحقق من بياناتها وروابطها.
// مثال: {id:"web-101",fieldId:"programming",title:"اسم الكورس الفعلي",level:"مبتدئ",duration:"مدة مؤكدة",price:"سعر مؤكد أو مجاني",description:"وصف حقيقي",url:"https://..."}
const COURSES = [];

const QUESTIONS = [
  {key:"interest",title:"إيه المجال اللي مهتم تتعلمه؟",subtitle:"اختار المجال الأقرب لفضولك — وتقدر تغيّر إجابتك في أي وقت.",options:[
    ["programming","⌘","البرمجة وتطوير المواقع"],["marketing","↗","التسويق الرقمي والإعلانات"],["design","✳","الجرافيك ديزاين"],["content","▶","المونتاج وصناعة المحتوى"],["ai","✧","الذكاء الاصطناعي AI"],["english","Aa","اللغة الإنجليزية وتطوير الذات"],["unsure","✦","لسه مش عارف وعايز مساعدة في اختيار المجال"]
  ]},
  {key:"level",title:"إيه مستواك الحالي؟",subtitle:"مفيش إجابة صح أو غلط — الهدف إن البداية تكون مناسبة ليك.",options:[
    ["beginner","◌","مبتدئ تمامًا"],["some","◒","عندي معلومات بسيطة"],["experienced","◉","عندي خبرة وعايز أطور نفسي"]
  ]},
  {key:"goal",title:"إيه هدفك من التعلم؟",subtitle:"اختار الهدف الأقرب للي نفسك تحققه في الفترة الجاية.",options:[
    ["cv","✧","تطوير مهاراتي وتقوية الـCV"],["projects","⌘","تنفيذ مشروعات عملية"],["job","↗","الاستعداد لسوق العمل والحصول على فرصة شغل"],["income","◇","تطوير شغلي الحالي وزيادة دخلي"]
  ]},
  {key:"time",title:"تقدر تخصص وقت قد إيه يوميًا للتعلم؟",subtitle:"اختار وقت تقدر تلتزم بيه بواقعية، حتى لو كان قليل.",options:[
    ["short","◷","أقل من ساعة"],["medium","◴","من ساعة إلى ساعتين"],["long","◵","أكثر من ساعتين"]
  ]},
  {key:"budget",title:"إيه الميزانية المناسبة ليك؟",subtitle:"هنراعي اختيارك ومش هنفترض إن الكورس المدفوع هو الأفضل دائمًا.",options:[
    ["free","◎","بدور على مصادر مجانية"],["limited","◉","ميزانيتي محدودة"],["paid","◇","مستعد أدفع مقابل محتوى تدريبي مناسب"]
  ]}
];

const state = {screen:"home",step:0,answers:{},results:null,selectedCompare:[]};
const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
let toastTimer;

function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2800)}
function showScreen(name){state.screen=name;$$(".screen").forEach(s=>s.classList.remove("active"));const target=$("#"+name+"Screen");if(target)target.classList.add("active");$$("[data-nav]").forEach(b=>b.classList.toggle("active",b.dataset.nav===(name==="home"?"home":name==="explore"?"explore":"")));window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}
function startQuiz(){state.step=0;showScreen("quiz");renderQuestion()}
function renderQuestion(){
  const q=QUESTIONS[state.step],saved=state.answers[q.key];
  $("#stepNumber").textContent=String(state.step+1).padStart(2,"0");
  $("#progressFill").style.width=`${((state.step+1)/QUESTIONS.length)*100}%`;
  $("#progressText").textContent=`${Math.round(((state.step+1)/QUESTIONS.length)*100)}% مكتمل`;
  $("#quizTitle").textContent=q.title;$("#quizSubtitle").textContent=q.subtitle;
  const grid=$("#optionsGrid");grid.replaceChildren();
  q.options.forEach(([value,icon,label])=>{
    const button=document.createElement("button");button.type="button";button.className="option-card"+(saved===value?" selected":"");button.setAttribute("aria-pressed",String(saved===value));
    const ic=document.createElement("span");ic.className="option-icon";ic.textContent=icon;
    const txt=document.createElement("span");txt.className="option-text";txt.textContent=label;
    const check=document.createElement("span");check.className="option-check";check.textContent="✓";
    button.append(ic,txt,check);button.addEventListener("click",()=>{state.answers[q.key]=value;renderQuestion()});grid.append(button);
  });
  $("#prevQuestion").disabled=state.step===0;
  $("#nextQuestion").disabled=!saved;
  $("#nextQuestion").innerHTML=state.step===QUESTIONS.length-1?'حلّل إجاباتي <span>✦</span>':'التالي <span>←</span>';
}
function scoreFields(){
  const a=state.answers;const scores=Object.fromEntries(FIELDS.map(f=>[f.id,0]));
  const add=(id,n)=>{if(scores[id]!==undefined)scores[id]+=n};
  if(a.interest==="unsure"){Object.keys(scores).forEach(id=>add(id,1));}
  else add(a.interest,6);
  if(a.goal==="projects"){add("programming",2);add("design",2);add("content",2);add("ai",2)}
  if(a.goal==="job"){add("programming",2);add("marketing",2);add("design",1);add("content",1)}
  if(a.goal==="income"){add("marketing",2);add("programming",2);add("design",2);add("content",2)}
  if(a.goal==="cv")add("english",2);
  if(a.level==="beginner"){add("english",1);add("ai",1)}
  if(a.time==="short"){add("marketing",1);add("design",1);add("english",1)}
  if(a.time==="long"){add("programming",1);add("ai",1)}
  if(a.budget==="free"){add("programming",1);add("ai",1);add("english",1)}
  const ranked=FIELDS.map(f=>({...f,score:scores[f.id]})).sort((x,y)=>y.score-x.score);
  return ranked;
}
function scorePercent(score,max){return Math.min(96,Math.max(55,Math.round(58+(score/Math.max(1,max))*36)))}
function buildReasons(field){
  const a=state.answers, reasons=[];
  if(a.interest==="unsure")reasons.push("لأنك لسه بتستكشف، بدأنا بمقارنة المجالات بدل افتراض اهتمام محدد.");
  else if(a.interest===field.id)reasons.push("ده المجال اللي اخترته بنفسك كأقرب حاجة لاهتمامك.");
  if(a.goal==="projects")reasons.push("هدفك تنفيذ مشروعات، والمجال ده يتيح لك التدريب من خلال تطبيقات عملية.");
  if(a.goal==="job")reasons.push("ربطنا الترشيح بهدف الاستعداد لسوق العمل، مع أهمية بناء ملف أعمال مناسب.");
  if(a.goal==="income")reasons.push("راعينا رغبتك في تطوير شغلك أو دخلك، مع التنبيه إن التعلم لا يضمن دخلًا محددًا.");
  if(a.goal==="cv")reasons.push("الترشيح يراعي رغبتك في تطوير مهارات قابلة للعرض في سيرتك الذاتية.");
  if(a.level==="beginner")reasons.push("هنبدأ بأساسيات واضحة من غير افتراض خبرة سابقة.");
  if(a.level==="some")reasons.push("تقدر تبني على معلوماتك الحالية وتسد الفجوات الأساسية.");
  if(a.level==="experienced")reasons.push("الأفضل تراجع الأساسيات بسرعة ثم تنتقل لمشروع أعمق وتخصص أوضح.");
  if(a.time==="short")reasons.push("خطتنا مقسّمة لخطوات قصيرة تناسب أقل من ساعة يوميًا.");
  if(a.time==="medium")reasons.push("وقت ساعة إلى ساعتين يوميًا يسمح بالتوازن بين التعلم والتطبيق.");
  if(a.time==="long")reasons.push("وقت التعلم الأكبر يتيح إضافة تطبيقات ومراجعة منتظمة.");
  if(a.budget==="free")reasons.push("هنبدأ بمصادر مجانية موثوقة وممارسة عملية قبل التفكير في الدفع.");
  if(a.budget==="limited")reasons.push("هنعطي الأولوية للموارد المجانية أو منخفضة التكلفة، من غير افتراض سعر.");
  if(a.budget==="paid")reasons.push("لو اخترت كورسًا مدفوعًا لاحقًا، قارن المنهج والتطبيقات والدعم قبل الشراء.");
  return reasons.slice(0,5);
}
function buildPlan(field){
  const a=state.answers;const level=a.level;const isBegin=level==="beginner";
  const stage1=isBegin?`تعرّف على أساسيات ${field.name} والمصطلحات الأساسية.`:`راجع أساسيات ${field.name} وحدّد 2–3 نقاط تحتاج تطويرها.`;
  const stage2=`تدرّب على مهارة واحدة في كل مرة: ${field.skills.slice(0,2).join(" و")}.`;
  const stage3=`نفّذ مشروعًا صغيرًا مرتبطًا بالمجال: ${field.first}`;
  const stage4="راجع النتيجة، دوّن ما تعلمته، واطلب ملاحظات من شخص موثوق أو مجتمع تعلّم.";
  return [
    ["01","افهم الأساسيات",stage1],
    ["02","تدرّب بانتظام",stage2],
    ["03","طبّق عمليًا",stage3],
    ["04","راجع وطوّر",stage4]
  ];
}
function renderResults(){
  const ranked=scoreFields(),main=ranked[0],max=Math.max(...ranked.map(x=>x.score),1);
  state.results={main,ranked};
  $("#mainIcon").textContent=main.icon;$("#mainField").textContent=main.name;$("#mainDescription").textContent=main.description;
  $("#matchScore").textContent=`توافق تقديري ${scorePercent(main.score,max)}%`;
  const ul=$("#reasonList");ul.replaceChildren();buildReasons(main).forEach(reason=>{const li=document.createElement("li");li.textContent=reason;ul.append(li)});
  $("#timeAdvice").textContent=({"short":"أقل من ساعة يوميًا","medium":"من ساعة إلى ساعتين","long":"أكثر من ساعتين"}[state.answers.time]);
  $("#budgetAdvice").textContent=({"free":"ابدأ بالمجاني","limited":"مجاني أو منخفض التكلفة","paid":"قارن قبل الشراء"}[state.answers.budget]);
  $("#levelAdvice").textContent=({"beginner":"مبتدئ تمامًا","some":"معلومات بسيطة","experienced":"خبرة سابقة"}[state.answers.level]);
  const alt=$("#alternateFields");alt.replaceChildren();
  ranked.slice(1,4).forEach(f=>{const row=document.createElement("div");row.className="alternate-item";const icon=document.createElement("span");icon.className="alt-icon";icon.textContent=f.icon;const textWrap=document.createElement("div");const strong=document.createElement("strong");strong.textContent=f.name;const small=document.createElement("small");small.textContent=f.skills.slice(0,2).join(" · ");textWrap.append(strong,small);row.append(icon,textWrap);alt.append(row)});
  const available=COURSES.filter(c=>c.fieldId===main.id&&c.title&&c.level&&c.duration&&c.price&&c.description&&c.url);
  const courseGrid=$("#courseGrid");courseGrid.replaceChildren();
  if(!available.length){$("#courseNotice").classList.remove("hidden");const empty=document.createElement("div");empty.className="empty-course";empty.textContent="مفيش كورسات مؤكدة مضافة للمجال ده حاليًا. هنسيب البيانات فارغة بدل ما نخترع أسماء أو أسعار أو روابط.";courseGrid.append(empty)}
  else{$("#courseNotice").classList.add("hidden");available.slice(0,3).forEach(c=>{const card=document.createElement("article");card.className="empty-course";const h=document.createElement("h3");h.textContent=c.title;const p=document.createElement("p");p.textContent=`${c.level} · ${c.duration} · ${c.price}`;const d=document.createElement("p");d.textContent=c.description;const link=document.createElement("a");link.href=c.url;link.target="_blank";link.rel="noopener noreferrer";link.textContent="اعرف التفاصيل ↗";link.className="course-link";card.append(h,p,d,link);courseGrid.append(card)})}
  const plan=$("#planSteps");plan.replaceChildren();buildPlan(main).forEach(([n,title,desc])=>{const card=document.createElement("article");card.className="plan-step";const num=document.createElement("div");num.className="plan-step-number";num.textContent=n;const h=document.createElement("h3");h.textContent=title;const p=document.createElement("p");p.textContent=desc;card.append(num,h,p);plan.append(card)});
  $("#resultsTitle").innerHTML='خلّينا نرسم <span class="gradient-text">خطوتك الجاية.</span>';
}
function beginAnalysis(){
  if(QUESTIONS.some(q=>!state.answers[q.key])){toast("جاوب على السؤال الحالي الأول.");return}
  showScreen("analysis");$$(".analysis-step").forEach(s=>s.classList.remove("done"));
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const delays=reduced?[0,0,0,0]:[250,650,1050,1450];
  delays.forEach((delay,i)=>setTimeout(()=>{$$("[data-analysis-step]")[i]?.classList.add("done");if(i===delays.length-1){renderResults();setTimeout(()=>showScreen("results"),reduced?0:350)}},delay));
}
function renderFields(filter=""){
  const grid=$("#fieldsGrid");grid.replaceChildren();
  const items=FIELDS.filter(f=>(f.name+" "+f.description+" "+f.skills.join(" ")).toLowerCase().includes(filter.toLowerCase()));
  items.forEach(f=>{
    const card=document.createElement("article");card.className="field-card";
    const top=document.createElement("div");top.className="field-card-top";const icon=document.createElement("span");icon.className="field-icon";icon.textContent=f.icon;const tag=document.createElement("span");tag.className="field-tag";tag.textContent=f.tag;top.append(icon,tag);
    const h=document.createElement("h2");h.textContent=f.name;const p=document.createElement("p");p.textContent=f.description;const tags=document.createElement("div");tags.className="skill-tags";f.skills.forEach(s=>{const t=document.createElement("span");t.className="skill-tag";t.textContent=s;tags.append(t)});
    const foot=document.createElement("div");foot.className="field-card-footer";const label=document.createElement("label");const checkbox=document.createElement("input");checkbox.type="checkbox";checkbox.value=f.id;checkbox.checked=state.selectedCompare.includes(f.id);checkbox.setAttribute("aria-label",`اختيار ${f.name} للمقارنة`);checkbox.addEventListener("change",()=>toggleCompare(f.id,checkbox.checked));label.append(checkbox,document.createTextNode("قارن المجال"));const btn=document.createElement("button");btn.textContent="اعرف المسار ↗";btn.addEventListener("click",()=>{state.answers={interest:f.id,level:"beginner",goal:"projects",time:"medium",budget:"free"};renderResults();showScreen("results")});foot.append(label,btn);card.append(top,h,p,tags,foot);grid.append(card);
  });
  if(!items.length){const p=document.createElement("p");p.className="empty-course";p.textContent="مفيش مجال مطابق للبحث ده. جرّب كلمة تانية.";grid.append(p)}
}
function toggleCompare(id,checked){if(checked){if(state.selectedCompare.length>=2){toast("تقدر تقارن مجالين في المرة الواحدة.");const input=$(`#fieldsGrid input[value="${id}"]`);if(input)input.checked=false;return}state.selectedCompare.push(id)}else state.selectedCompare=state.selectedCompare.filter(x=>x!==id);renderCompare();syncCompareSelect()}
function syncCompareSelect(){const select=$("#compareSelect"),current=select.value;select.replaceChildren();const first=document.createElement("option");first.value="";first.textContent="قارن مجالًا مع مجال آخر";select.append(first);FIELDS.forEach(f=>{const op=document.createElement("option");op.value=f.id;op.textContent=f.name;select.append(op)});select.value=current}
function renderCompare(){
  const panel=$("#comparePanel");if(state.selectedCompare.length<2){panel.classList.add("hidden");panel.replaceChildren();return}
  panel.classList.remove("hidden");panel.replaceChildren();const h=document.createElement("h3");h.textContent="مقارنة سريعة بين المجالين";panel.append(h);const cols=document.createElement("div");cols.className="compare-columns";
  state.selectedCompare.slice(0,2).forEach(id=>{const f=FIELDS.find(x=>x.id===id);const col=document.createElement("div");col.className="compare-col";const title=document.createElement("strong");title.textContent=f.name;const desc=document.createElement("p");desc.textContent=f.description;const skills=document.createElement("span");skills.textContent="مهارات أساسية: "+f.skills.join("، ");const work=document.createElement("p");work.textContent="أمثلة للعمل: "+f.work;col.append(title,desc,skills,work);cols.append(col)});panel.append(cols);
}
function init(){
  $("#year").textContent=new Date().getFullYear();
  $("#startQuiz").addEventListener("click",startQuiz);$("#navStart").addEventListener("click",startQuiz);$("#exploreButton").addEventListener("click",()=>{renderFields();showScreen("explore")});$("#exploreStart").addEventListener("click",startQuiz);
  $$("[data-home]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();showScreen("home")}));
  $$("[data-nav]").forEach(el=>el.addEventListener("click",()=>{if(el.dataset.nav==="explore"){renderFields();showScreen("explore")}else showScreen("home")}));
  $("#quizBack").addEventListener("click",()=>showScreen("home"));
  $("#prevQuestion").addEventListener("click",()=>{if(state.step>0){state.step--;renderQuestion()}});
  $("#nextQuestion").addEventListener("click",()=>{if(!state.answers[QUESTIONS[state.step].key]){toast("اختار إجابة عشان نكمل.");return}if(state.step<QUESTIONS.length-1){state.step++;renderQuestion()}else beginAnalysis()});
  $("#restartQuiz").addEventListener("click",startQuiz);$("#bottomRestart").addEventListener("click",startQuiz);
  $("#showPlan").addEventListener("click",()=>$("#learningPlan").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"}));
  $("#shareResult").addEventListener("click",async()=>{if(!state.results)return;const f=state.results.main;const message=`نتيجة اكتشاف مساري من FIND YOUR PATH\\nالمجال المقترح: ${f.name}\\n${f.description}\\nاكتشف مسارك أنت كمان!`;try{if(navigator.share)await navigator.share({title:"FIND YOUR PATH",text:message});else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(message);toast("نسخنا ملخص نتيجتك — تقدر تشاركه.");}else toast(message)}catch(e){if(e.name!=="AbortError")toast("تعذرت المشاركة من الجهاز ده.")}});
  $("#sendWhatsApp").addEventListener("click",()=>{
    if(!state.results){toast("كمّل الاختبار الأول عشان نجهز نتيجتك.");return}
    const a=state.answers, f=state.results.main, ranked=state.results.ranked;
    const name=$("#userName").value.trim();
    const phone=$("#whatsappNumber").value;
    const interestLabel=QUESTIONS[0].options.find(x=>x[0]===a.interest)?.[2]||"غير محدد";
    const levelLabel=({"beginner":"مبتدئ تمامًا","some":"عندي معلومات بسيطة","experienced":"عندي خبرة وعايز أطور نفسي"})[a.level]||"غير محدد";
    const goalLabel=({"cv":"تطوير المهارات وتقوية السيرة الذاتية","projects":"تنفيذ مشروعات عملية","job":"الاستعداد لسوق العمل والحصول على فرصة شغل","income":"تطوير الشغل الحالي وزيادة الدخل"})[a.goal]||"غير محدد";
    const timeLabel=({"short":"أقل من ساعة يوميًا","medium":"من ساعة إلى ساعتين يوميًا","long":"أكثر من ساعتين يوميًا"})[a.time]||"غير محدد";
    const budgetLabel=({"free":"مصادر مجانية","limited":"ميزانية محدودة","paid":"مستعد أدفع مقابل محتوى مناسب"})[a.budget]||"غير محدد";
    const reasons=buildReasons(f).map((r,i)=>`${i+1}. ${r}`).join("\\n");
    const alternatives=ranked.slice(1,4).map((x,i)=>`${i+1}. ${x.name}`).join("\\n");
    const plan=buildPlan(f).map(([n,title,desc])=>`${n} - ${title}: ${desc}`).join("\\n");
    const courseList=COURSES.filter(c=>c.fieldId===f.id&&c.title&&c.level&&c.duration&&c.price&&c.description&&c.url).slice(0,3);
    const courseText=courseList.length?courseList.map(c=>`- ${c.title} | المستوى: ${c.level} | المدة: ${c.duration} | السعر: ${c.price} | الرابط: ${c.url}`).join("\\n"):"لا توجد كورسات موثّقة مضافة للمجال حتى الآن.";
    const message=[
      "مرحبًا، عايز أكمّل معاكم من منصة FIND YOUR PATH.",
      name?`الاسم: ${name}`:"الاسم: لم يتم إدخاله",
      "",
      "— إجاباتي في الاختبار —",
      `المجال اللي اخترته: ${interestLabel}`,
      `المستوى الحالي: ${levelLabel}`,
      `الهدف: ${goalLabel}`,
      `الوقت المتاح: ${timeLabel}`,
      `الميزانية: ${budgetLabel}`,
      "",
      "— نتيجة الترشيح —",
      `المجال المقترح: ${f.name}`,
      `نسبة التوافق التقديرية: ${scorePercent(f.score,Math.max(...ranked.map(x=>x.score),1))}%`,
      `وصف المجال: ${f.description}`,
      "أسباب الترشيح:",
      reasons,
      "",
      "مسارات بديلة:",
      alternatives,
      "",
      "خطة البداية المقترحة:",
      plan,
      "",
      "الكورسات الموثّقة المتاحة:",
      courseText,
      "",
      "من فضلكم ساعدوني أعرف أنسب كورس والخطوة الجاية."
    ].join("\\n");
    const url=`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url,"_blank","noopener,noreferrer");
  });
  $("#exploreBack").addEventListener("click",()=>showScreen("home"));$("#fieldSearch").addEventListener("input",e=>renderFields(e.target.value));$("#clearCompare").addEventListener("click",()=>{state.selectedCompare=[];renderFields($("#fieldSearch").value);renderCompare()});
  $("#compareSelect").addEventListener("change",e=>{const id=e.target.value;if(!id)return;if(!state.selectedCompare.includes(id)){if(state.selectedCompare.length===2)state.selectedCompare.shift();state.selectedCompare.push(id)}renderFields($("#fieldSearch").value);renderCompare();});
  renderFields();syncCompareSelect();
}
document.addEventListener("DOMContentLoaded",init);
