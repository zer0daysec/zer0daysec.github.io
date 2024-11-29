import{_ as a,c as n,a3 as e,o as t}from"./chunks/framework.DtMx7FFi.js";const u=JSON.parse('{"title":"注释","description":"","frontmatter":{"layout":"doc","title":"注释"},"headers":[],"relativePath":"tools/yara/writerules/notes.md","filePath":"tools/yara/writerules/notes.md"}'),p={name:"tools/yara/writerules/notes.md"};function l(i,s,o,c,r,d){return t(),n("div",null,s[0]||(s[0]=[e(`<div class="title-wrapper"><div class="page-title">注释</div><div class="post-title">—— yara 使用手册 · 编写 yara 规则 <span class="lastModifyTime"><i class="fa-regular fa-clock"></i> 最后更新： 2023-03-12 11:12:33 </span></div></div><p>可以向 Yara 规则添加注释，就像是在 C 中一样，支持单行和多行 C 风格注释。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/*</span></span>
<span class="line"><span>    This is a multi-line comment ...</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rule CommentExample   // ... and this is single-line comment</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        false  // just a dummy rule, don&#39;t do this</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,3)]))}const v=a(p,[["render",l]]);export{u as __pageData,v as default};
