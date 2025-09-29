import React from 'react';


export default function Navbar({onOpenMobileSidebar, onToggleCollapse, collapsed}){
return (
<header className="navbar" role="banner">
<div className="brand">
<button aria-label="Open sidebar" onClick={onOpenMobileSidebar} style={{display:'none'}} className="mobile-only">
☰
</button>
<div className="logo">B</div>
<div className="brand-text">Brand Name</div>
</div>


<div className="nav-actions">
<button title="Toggle sidebar" onClick={onToggleCollapse} aria-pressed={collapsed}>
{collapsed? '➡' : '⬅'}
</button>
<div style={{display:'flex',alignItems:'center',gap:8}}>
<input placeholder="Search..." style={{padding:'8px 12px',borderRadius:8,border:'1px solid var(--color-border)'}}/>
<div style={{width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:999,background:'var(--color-primary)'}} title="User">
<span style={{color:'#fff',fontWeight:700}}>M</span>
</div>
</div>
</div>
</header>
)
}