import{_ as a,c as n,a3 as p,o as e}from"./chunks/framework.DtMx7FFi.js";const h=JSON.parse('{"title":"外部变量","description":"","frontmatter":{"layout":"doc","title":"外部变量"},"headers":[],"relativePath":"tools/yara/writerules/external-var.md","filePath":"tools/yara/writerules/external-var.md"}'),l={name:"tools/yara/writerules/external-var.md"};function i(t,s,c,o,r,d){return e(),n("div",null,s[0]||(s[0]=[p(`<div class="title-wrapper"><div class="page-title">外部变量</div><div class="post-title">—— yara 使用手册 · 编写 yara 规则 <span class="lastModifyTime"><i class="fa-regular fa-clock"></i> 最后更新： 2023-03-08 08:13:23 </span></div></div><p>外部变量允许你定义依赖于外部提供的值的规则，例如，可以编写以下规则：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule ExternalVariableExample1</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        ext_var == 10</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在这种情况下，<code>ext_var</code> 是一个外部变量，其值在运行时分配 (参见命令行工具的 -d 选项和 externals yara-python 中的方法)。外部变量可以是以下类型：整数、字符串或布尔值，它们的类型取决于分配给它们的值。整型变量可以替代条件中的任何整型常量，布尔变量可以占据布尔表达式的位置，例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule ExternalVariableExample2</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        bool_ext_var or filesize &lt; int_ext_var</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>字符串类型的外部变量可以与运算符一起使用：<code>contains</code>、<code>startswith</code>、<code>endswith</code> 及其不区分大小写的对应项：<code>icontains</code>、<code>istartswith</code> 和 <code>iendswith</code>。它们还可以与 <code>matches</code> 运算符一起使用，如果字符串与给定的正则表达式匹配，则返回 true。不区分大小写的字符串比较可以通过特殊运算符 <code>iequals</code> 来完成，该运算符仅适用于字符串。对于区分大小写的比较，请使用常规 <code>==</code>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule ContainsExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        string_ext_var contains &quot;text&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rule CaseInsensitiveContainsExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        string_ext_var icontains &quot;text&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rule StartsWithExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        string_ext_var startswith &quot;prefix&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rule EndsWithExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        string_ext_var endswith &quot;suffix&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rule IequalsExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        string_ext_var iequals &quot;string&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rule MatchesExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        string_ext_var matches /[a-z]+/</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>可以将正则表达式修饰符与 <code>matches</code> 运算符一起使用，例如，如果希望上一个示例中的正则表达式不区分大小写，则可以使用 <code>/[a-z]+/i</code>。请注意正则表达式后面的 i 以类似于 Perl 的方式。你还可以使用 <code>s</code> 修饰符进行单行模式，在此模式下，点匹配包括换行符在内的所有字符。当然，这两个修饰符可以同时使用，如下例所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule ExternalVariableExample5</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        /* case insensitive single-line mode */</span></span>
<span class="line"><span>        string_ext_var matches /[a-z]+/is</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>请记住，规则中使用的每个外部变量都必须在运行时定义，可以使用命令行工具的 -d 选项，也可以给 yara-python 中适当方法提供 externals 参数。</p>`,10)]))}const v=a(l,[["render",i]]);export{h as __pageData,v as default};
