import{_ as s,c as n,a3 as e,o as p}from"./chunks/framework.DtMx7FFi.js";const h=JSON.parse('{"title":"拓展","description":"","frontmatter":{"layout":"doc","title":"拓展"},"headers":[],"relativePath":"tools/yara/writerules/more-about-rules.md","filePath":"tools/yara/writerules/more-about-rules.md"}'),l={name:"tools/yara/writerules/more-about-rules.md"};function i(t,a,o,c,r,d){return p(),n("div",null,a[0]||(a[0]=[e(`<div class="title-wrapper"><div class="page-title">拓展</div><div class="post-title">—— yara 使用手册 · 编写 yara 规则 <span class="lastModifyTime"><i class="fa-regular fa-clock"></i> 最后更新： 2023-03-11 15:22:11 </span></div></div><p>Yara 规则的某些方面尚未涵盖，但仍然非常重要。它们是：全局规则、私有规则、标签和元数据。</p><h2 id="全局规则" tabindex="-1">全局规则 <a class="header-anchor" href="#全局规则" aria-label="Permalink to &quot;全局规则&quot;">​</a></h2><p>全局规则可以对所有规则施加限制，例如，假设你希望所有规则忽略超过特定大小限制的文件，可以逐条规则对其条件进行所需的修改，或者只编写一个全局规则，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>global rule SizeLimit</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        filesize &lt; 2MB</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>可以根据需要定义任意数量的全局规则，它们将在其余规则之前进行判定，而其余规则只有在满足所有全局规则时才会进行判定。</p><h2 id="私有规则" tabindex="-1">私有规则 <a class="header-anchor" href="#私有规则" aria-label="Permalink to &quot;私有规则&quot;">​</a></h2><p>私有规则是一个非常简单的概念，它们只是在给定文件上匹配时 Yara 不会报告的规则。乍一看，根本不报告的规则可能看起来毫无意义，但当与 Yara 提供的从另一个规则引用一个规则的可能性混合在一起时 (请参阅匹配条件中引用其它规则)，它们就会变得有用。私有规则可以作为其他规则的构建块，同时防止 Yara 的输出出现不相关的信息。要将规则声明为私有，只需在规则声明之前添加关键字 <code>private</code> 即可。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>private rule PrivateRuleExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>可以将 <code>private</code> 和 <code>global</code> 修饰符应用于规则，从而生成 Yara 不会报告但必须满足的全局规则。</p><h2 id="规则标签" tabindex="-1">规则标签 <a class="header-anchor" href="#规则标签" aria-label="Permalink to &quot;规则标签&quot;">​</a></h2><p>Yara 的另一个有用的功能是可以向规则添加标签，这些标签稍后可用于过滤 Yara 的输出并仅显示你感兴趣的规则。可以向规则添加任意数量的标签，它们在规则标识符之后声明，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule TagsExample1 : Foo Bar Baz</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rule TagsExample2 : Bar</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>标签必须遵循与规则标识符相同的词汇约定，因此只允许使用字母数字字符和下划线，并且标签不能以数字开头，也区分大小写。</p><p>使用 Yara 时，只能输出那些标有你提供的一个或多个标签的规则。</p><h2 id="元数据" tabindex="-1">元数据 <a class="header-anchor" href="#元数据" aria-label="Permalink to &quot;元数据&quot;">​</a></h2><p>除了字符串定义和条件部分之外，规则还可以有一个元数据部分，可以在其中放置有关规则的其他信息。元数据部分使用关键字 <code>meta</code> 定义，如下例所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule MetadataExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    meta:</span></span>
<span class="line"><span>        my_identifier_1 = &quot;Some string data&quot;</span></span>
<span class="line"><span>        my_identifier_2 = 24</span></span>
<span class="line"><span>        my_identifier_3 = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $my_text_string = &quot;text here&quot;</span></span>
<span class="line"><span>        $my_hex_string = { E2 34 A1 C8 23 FB }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $my_text_string or $my_hex_string</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>从示例中可以看出，元数据标识符后面始终跟有等号和分配给它们的值。指定的值可以是字符串 (仅适用于 UTF8)、整数或布尔值 true 或 false 之一。请注意，元数据部分中定义的 <code>标识符-值</code> 对不能在条件部分中使用，它们的唯一目的是存储有关规则的附加信息。</p>`,19)]))}const m=s(l,[["render",i]]);export{h as __pageData,m as default};
