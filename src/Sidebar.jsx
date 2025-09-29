import React, {useState} from 'react';


function DefaultIcon(){
return (
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
<circle cx="12" cy="12" r="9" strokeOpacity="0.12" />
<path d="M8 12h8" />
</svg>
)
}


export default function Sidebar({items = [], collapsed=false, onNavigate, mobileOpen=false, onClose}){
const [openKeys, setOpenKeys] = useState({});


function toggle(key){
setOpenKeys(prev=>({...prev, [key]: !prev[key]}))
}


return (
<aside className={`sidebar ${collapsed? 'collapsed':''} ${mobileOpen? 'open':''}`} aria-label="Sidebar">
<div className="brand-compact">
<div className="logo">B</div>
<div className="brand-text">Brand Name</div>
</div>


<nav>
<ul className="menu-list">
{items.map(item=> (
<li key={item.key || item.name}>
<div
role="button"
className={`menu-item ${item.active? 'active':''}`}
onClick={(e)=>{
e.preventDefault();
if(item.children && item.children.length){ toggle(item.key || item.name); return }
if(onNavigate) onNavigate(item.path || '#');
if(onClose) onClose();
}}
tabIndex={0}
onKeyDown={(e)=>{ if(e.key==='Enter') e.currentTarget.click() }}
>
<div className="icon">{ item.icon || <DefaultIcon/> }</div>
<div className="label">{item.name}</div>
{ item.children && item.children.length ? <div style={{marginLeft:'auto'}}>{ openKeys[item.key || item.name] ? '▾' : '▸' }</div> : null }
</div>


{ item.children && item.children.length ? (
<ul className={`submenu ${openKeys[item.key || item.name]? 'open':''}`}>
{ item.children.map(sub=> (
<li key={sub.key || sub.name}>
<a className="menu-item small" onClick={(e)=>{ e.preventDefault(); if(onNavigate) onNavigate(sub.path||'#'); if(onClose) onClose(); }} href={sub.path||'#'}>
<div style={{width:24}} />
<div className="label">{sub.name}</div>
</a>
</li>
))}
</ul>
) : null }
</li>
))}
</ul>
</nav>


<div style={{flex:1}} />


<div style={{padding:8}}>
<button className="menu-item" onClick={()=>{ if(onNavigate) onNavigate('/logout') }}>
<div className="icon">⎋</div>
<div className="label">Logout</div>
</button>
</div>
</aside>
)
}