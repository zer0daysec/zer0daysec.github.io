import{_ as a,c as n,a3 as e,o as p}from"./chunks/framework.DtMx7FFi.js";const u=JSON.parse('{"title":"字符串","description":"","frontmatter":{"layout":"doc","title":"字符串"},"headers":[],"relativePath":"tools/yara/writerules/strings.md","filePath":"tools/yara/writerules/strings.md"}'),i={name:"tools/yara/writerules/strings.md"};function l(o,s,c,t,d,r){return p(),n("div",null,s[0]||(s[0]=[e(`<div class="title-wrapper"><div class="page-title">字符串</div><div class="post-title">—— yara 使用手册 · 编写 yara 规则 <span class="lastModifyTime"><i class="fa-regular fa-clock"></i> 最后更新： 2023-03-13 11:27:53 </span></div></div><p>Yara 中有三种类型的字符串：十六进制字符串、文本字符串和正则表达式。十六进制字符串用于定义原始字节序列，而文本字符串和正则表达式可用于定义清晰文本的部分。然而，文本字符串和正则表达式也可以用于通过转义序列来表示原始字节。</p><h2 id="十六进制字符串" tabindex="-1">十六进制字符串 <a class="header-anchor" href="#十六进制字符串" aria-label="Permalink to &quot;十六进制字符串&quot;">​</a></h2><p>十六进制字符串允许四种特殊结构，使它们更加灵活：通配符、非运算符、跳转和替代。通配符只是占位符，可以将其放入字符串中，指示某些字节未知，并且匹配任何内容。占位符是问号 <code>?</code>，下面是一个带有通配符的十六进制字符串的示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule WildcardExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $hex_string = { E2 34 ?? C8 A? FB }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $hex_string</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如示例所示，通配符是半字节的，这意味着可以仅定义字节的一个半字节，而其他则未知。</p><p>从版本 4.3.0 开始，可以指定字节不是特定值。为此，可以使用带有字节值的 not 运算符：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule NotExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $hex_string = { F4 23 ~00 62 B4 }</span></span>
<span class="line"><span>        $hex_string2 = { F4 23 ~?0 62 B4 }</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $hex_string and $hex_string2</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在上面的示例中，有一个以波形符 <code>~</code> 为前缀的字节，它是非运算符。这定义了该位置中的字节可以采用除指定值之外的任何值。在这种情况下，仅当字节不为 00 时，第一个字符串才会匹配。not 运算符也可以与半字节通配符一起使用，因此仅当第二个半字节不为 0 时，第二个字符串才会匹配。</p><p>当定义内容可能变化且知道变量块长度的字符串时，通配符和非运算符非常有用，但是情况并非总是如此。在某些情况下，可能需要定义具有可变内容和长度块的字符串，那么在这种情况下，可以使用跳转而不是通配符：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule JumpExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $hex_string = { F4 23 [4-6] 62 B4 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $hex_string</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在上面的例子中，有一对数字括在方括号中并用连字符分隔，这是一个跳转。这个跳转表明 4 到 6 个字节的任意序列都可以占据跳转的位置，以下任何字符串都将与该模式匹配：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>F4 23 01 02 03 04 62 B4</span></span>
<span class="line"><span>F4 23 00 00 00 00 00 62 B4</span></span>
<span class="line"><span>F4 23 15 82 A3 04 45 22 62 B4</span></span></code></pre></div><p>任何跳转 [X-Y] 都必须满足条件 <code>0 &lt;= X &lt;= Y</code>。在 Yara 的早期版本中，X 和 Y 都必须低于 256，但从 Yara 2.0 开始，X 和 Y 没有限制。</p><p>下面是有效的跳转：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FE 39 45 [0-8] 89 00</span></span>
<span class="line"><span>FE 39 45 [23-45] 89 00</span></span>
<span class="line"><span>FE 39 45 [1000-2000] 89 00</span></span></code></pre></div><p>无效的跳转：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FE 39 45 [10-7] 89 00</span></span></code></pre></div><p>如果下限和上限相等，可以写一个用括号括起来的数字，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FE 39 45 [6] 89 00</span></span></code></pre></div><p>上面的字符串相当于这两个：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FE 39 45 [6-6] 89 00</span></span>
<span class="line"><span>FE 39 45 ?? ?? ?? ?? ?? ?? 89 00</span></span></code></pre></div><p>从 Yara 2.0 开始，还可以使用无界 (无边界) 跳转：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FE 39 45 [10-] 89 00</span></span>
<span class="line"><span>FE 39 45 [-] 89 00</span></span></code></pre></div><p>第一个表示 <code>[10-infinite]</code>，第二个表示 <code>[0-infinite]</code>。</p><p>在某些情况下，可能希望为十六进制字符串的给定片段提供不同的替代方案。在这些情况下可以使用类似于正则表达式的语法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule AlternativesExample1</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $hex_string = { F4 23 ( 62 B4 | 56 ) 45 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $hex_string</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>此规则将匹配任何包含 <code>F42362B445</code> 或 <code>F4235645</code> 的文件。</p><p>但也可以表达两种以上的替代方案，事实上，可以提供替代序列的数量及其长度都没有限制。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule AlternativesExample2</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $hex_string = { F4 23 ( 62 B4 | 56 | 45 ?? 67 ) 45 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $hex_string</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>从上面的示例中也可以看出，包含通配符的字符串允许作为替代序列的一部分。</p><h2 id="文本字符串" tabindex="-1">文本字符串 <a class="header-anchor" href="#文本字符串" aria-label="Permalink to &quot;文本字符串&quot;">​</a></h2><p>文本字符串通常定义如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule TextExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $text_string = &quot;foobar&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $text_string</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这是最简单的情况：ASCII 编码、区分大小写的字符串。但是，文本字符串可以附带一些有用的修饰符，这些修饰符可以改变字符串的解释方式。这些修饰符附加在字符串定义的末尾，并用空格分隔。文本字符串还可以包含 C 语言中可用的转义序列的以下子集：</p><ul><li><code>\\&quot;</code>：双引号</li><li><code>\\\\</code>：反斜杠</li><li><code>\\r</code>：回车符</li><li><code>\\t</code>：水平制表符</li><li><code>\\n</code>：换行符</li><li><code>\\xdd</code>：十六进制表示的字节</li></ul><p>在 4.1.0 之前的所有 Yara 版本中，文本字符串接受任何类型的 unicode 字符，无论其编码如何，这些字符被 Yara 解释为原始字节，因此最终的字符串实际上是由文本编辑器使用的编码格式决定的。这从来都不是一个功能，最初的意图始终是 Yara 字符串应该仅包含 ASCII，并且 Yara 4.1.0 开始对字符串中的非 ASCII 字符发出警告，此限制不适用于元数据部分或注释中的字符串。<a href="https://github.com/VirusTotal/yara/wiki/Unicode-characters-in-YARA" target="_blank" rel="noreferrer">此处</a> 查看更多详细信息。</p><h2 id="不区分大小写的字符串" tabindex="-1">不区分大小写的字符串 <a class="header-anchor" href="#不区分大小写的字符串" aria-label="Permalink to &quot;不区分大小写的字符串&quot;">​</a></h2><p>Yara 中的文本字符串默认区分大小写，但是可以通过在同一行中的字符串定义末尾附加修饰符 <code>nocase</code>，将字符串设置为不区分大小写：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule CaseInsensitiveTextExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $text_string = &quot;foobar&quot; nocase</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $text_string</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>使用 <code>nocase</code> 修饰符，字符串 foobar 将匹配 Foobar、FOOBAR 和 fOoBaR。此修饰符可以与除 <code>base64</code> 、<code>base64wide</code> 和 <code>xor</code> 之外的任何修饰符结合使用。</p><h2 id="宽字符串" tabindex="-1">宽字符串 <a class="header-anchor" href="#宽字符串" aria-label="Permalink to &quot;宽字符串&quot;">​</a></h2><p><code>wide</code> 修饰符可用于搜索每个字符用两个字节编码的字符串，这在许多可执行二进制文件中很常见。</p><p>例如，如果字符串 &quot;Borland&quot; 显示为每个字符两个字节编码 (即 B\\x00o\\x00r\\x00l\\x00a\\x00n\\x00d\\x00 )，则以下规则将匹配：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule WideCharTextExample1</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $wide_string = &quot;Borland&quot; wide</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $wide_string</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>但是，请记住，此修饰符只是将字符串中字符的 ASCII 代码与 0 交错，它不支持真正包含非英语字符的 UTF-16 字符串。如果要搜索 ASCII 和宽格式的字符串，则可以将 ascii 修饰符与 wide 结合使用，无论它们出现的顺序如何。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule WideCharTextExample2</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $wide_and_ascii_string = &quot;Borland&quot; wide ascii</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $wide_and_ascii_string</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>ascii</code> 修饰符可以单独出现，无需附带 wide 修饰符，但没有必要编写它，因为在没有 wide 的情况下，字符串默认情况下被假定为 <code>ascii</code>。</p><h2 id="异或字符串" tabindex="-1">异或字符串 <a class="header-anchor" href="#异或字符串" aria-label="Permalink to &quot;异或字符串&quot;">​</a></h2><p><code>xor</code> 修饰符可用于搜索应用了单字节 XOR 的字符串。</p><p>以下规则将搜索应用于字符串 &quot;This program Cannot&quot; (包括明文字符串) 的每个单字节 XOR：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule XorExample1</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $xor_string = &quot;This program cannot&quot; xor</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $xor_string</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上述规则在逻辑上等价于：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule XorExample2</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $xor_string_00 = &quot;This program cannot&quot;</span></span>
<span class="line"><span>        $xor_string_01 = &quot;Uihr!qsnfs\`l!b\`oonu&quot;</span></span>
<span class="line"><span>        $xor_string_02 = &quot;Vjkq\\&quot;rpmepco\\&quot;acllmv&quot;</span></span>
<span class="line"><span>        // Repeat for every single byte XOR</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        any of them</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>还可以将 <code>xor</code> 修饰符与 <code>wide</code>、<code>ascii</code> 修饰符结合使用。例如，要在应用每个单字节 XOR 后搜索字符串的 <code>wide</code> 和 <code>ascii</code> 版本，可以这样使用：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule XorExample3</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $xor_string = &quot;This program cannot&quot; xor wide ascii</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $xor_string</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>xor</code> 修饰符在所有其他修饰符之后应用，这意味着同时使用 <code>xor</code> 和 <code>wide</code> 会导致 XOR 应用于交错的 0 字节，例如，以下两条规则在逻辑上是等价的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule XorExample4</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $xor_string = &quot;This program cannot&quot; xor wide</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $xor_string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rule XorExample4</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $xor_string_00 = &quot;T\\x00h\\x00i\\x00s\\x00 \\x00p\\x00r\\x00o\\x00g\\x00r\\x00a\\x00m\\x00 \\x00c\\x00a\\x00n\\x00n\\x00o\\x00t\\x00&quot;</span></span>
<span class="line"><span>        $xor_string_01 = &quot;U\\x01i\\x01h\\x01r\\x01!\\x01q\\x01s\\x01n\\x01f\\x01s\\x01\`\\x01l\\x01!\\x01b\\x01\`\\x01o\\x01o\\x01n\\x01u\\x01&quot;</span></span>
<span class="line"><span>        $xor_string_02 = &quot;V\\x02j\\x02k\\x02q\\x02\\&quot;\\x02r\\x02p\\x02m\\x02e\\x02p\\x02c\\x02o\\x02\\&quot;\\x02a\\x02c\\x02l\\x02l\\x02m\\x02v\\x02&quot;</span></span>
<span class="line"><span>        // Repeat for every single byte XOR operation.</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        any of them</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>从 Yara 3.11 开始，如果想更好地控制 xor 修饰符使用的字节范围，请这样使用：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule XorExample5</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $xor_string = &quot;This program cannot&quot; xor(0x01-0xff)</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $xor_string</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面的示例将在搜索时将 0x01 到 0xff (含) 的字节应用于字符串，一般语法是 <code>xor(minimum-maximum)</code>。</p><h2 id="base64-字符串" tabindex="-1">Base64 字符串 <a class="header-anchor" href="#base64-字符串" aria-label="Permalink to &quot;Base64 字符串&quot;">​</a></h2><p><code>base64</code> 修饰符可用于搜索已 Base64 编码过的字符串，以下规则将搜索字符串 &quot;This program Cannot&quot; 的三个 Base64 排列：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule Base64Example1</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;This program cannot&quot; base64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $a</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这将导致 Yara 搜索这三种排列：</p><ul><li>VGhpcyBwcm9ncmFtIGNhbm5vd</li><li>RoaXMgcHJvZ3JhbSBjYW5ub3</li><li>UaGlzIHByb2dyYW0gY2Fubm90</li></ul><p><code>base64wide</code> 修饰符的工作方式与 <code>base64</code> 修饰符类似，但 <code>base64</code> 修饰符的结果会转换为宽型。</p><p><code>base64</code> (或 <code>base64wide</code>) 与 <code>wide</code> 和 <code>ascii</code> 之间的交互正如你所斯特那样。<code>wide</code> 和 <code>ascii</code> 首先应用于字符串，然后应用 base64 和 base64wide 修饰符。搜索中绝不包含 <code>ascii</code> 或 <code>wide</code> 版本字符串的明文。如果还想包含这些内容，可以将它们放入辅助字符串中。</p><p><code>base64</code> 和 <code>base64wide</code> 修饰符还支持自定义字母表。例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule Base64Example2</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;This program cannot&quot; base64(&quot;!@#$%^&amp;*(){}[].,|ABCDEFGHIJ\\x09LMNOPQRSTUVWXYZabcdefghijklmnopqrstu&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $a</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>字母表的长度必须为 64 字节，<code>base64</code> 和 <code>base64wide</code> 修饰符仅支持文本字符串。将这些修饰符与十六进制字符串或正则表达式一起使用将导致编译器错误。此外，<code>xor</code>、<code>fullword</code> 和 <code>nocase</code> 修饰符与 <code>base64</code> 或 <code>base64wide</code> 结合使用将导致编译器错误。</p><p>由于 Yara 在 Base64 编码后去除前导和尾随字符的方式，&quot;Dhis program cannow&quot; 和 &quot;This program Cannot&quot; 的 Base64 编码之一是相同的。同样，不建议对单个 ASCII 字符使用 base64 关键字。例如，带有 <code>base64</code> 关键字的 &quot;a&quot; 在 <code>base64</code> 编码后匹配 &quot;\`&quot;、&quot;b&quot;、&quot;c&quot;、&quot;!&quot;、&quot;\\xA1&quot; 或 &quot;\\xE1&quot;，并且不会匹配 <code>Base64</code> 编码与 <code>[GWm2][EFGH]</code> 正则表达式匹配的位置。</p><h2 id="全字搜索" tabindex="-1">全字搜索 <a class="header-anchor" href="#全字搜索" aria-label="Permalink to &quot;全字搜索&quot;">​</a></h2><p>另一个可以应用于文本字符串的修饰符是 <code>fullword</code>，此修饰符保证字符串仅在出现在由非字母数字字符分隔的文件中时才匹配。例如，字符串域，如果定义为 <code>fullword</code>，则与 <code>www.mydomain.com</code> 不匹配，但它与 <code>www.my-domain.com</code> 和 <code>www.domain.com</code> 匹配。</p><h2 id="正则表达式" tabindex="-1">正则表达式 <a class="header-anchor" href="#正则表达式" aria-label="Permalink to &quot;正则表达式&quot;">​</a></h2><p>正则表达式是 Yara 最强大的功能之一，它们的定义方式与文本字符串相同，但用正斜杠而不是像 Perl 语言中的双引号括起来。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule RegExpExample1</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $re1 = /md5: [0-9a-fA-F]{32}/</span></span>
<span class="line"><span>        $re2 = /state: (on|off)/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $re1 and $re2</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>正则表达式后面也可以跟 <code>nocase</code>、<code>ascii</code>、<code>wide</code> 和 <code>fullword</code> 修饰符，就像在文本字符串中一样，这些修饰符的语义在这两种情况下是相同的。</p><p>此外，它们可以紧跟在结束斜杠之后的字符 i 和 s，这是指定正则表达式不区分大小写且点号的非常常见的约定。<code>.</code> 可以匹配换行符。例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule RegExpExample2</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $re1 = /foo/i    // This regexp is case-insentitive</span></span>
<span class="line"><span>        $re2 = /bar./s   // In this regexp the dot matches everything, including new-line</span></span>
<span class="line"><span>        $re3 = /baz./is  // Both modifiers can be used together</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        any of them</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>请注意，<code>/foo/i</code> 相当于 <code>/foo/ nocase</code>，但我们建议在定义字符串时使用后者。在为 <code>matches</code> 运算符编写不区分大小写的正则表达式时，<code>/foo/i</code> 语法非常有用。</p><p>在之前版本的 Yara 中，使用 PCRE 和 RE2 等外部库来执行正则表达式匹配，但从 2.0 版本开始，YARA 使用自己的正则表达式引擎，这个新引擎实现了 PCRE 中的大多数功能，除了其中一些功能，例如捕获组、POSIX 字符类 ([[:isalpha:]]、[[:isdigit:]] 等) 和反向引用。</p><p>Yara 的正则表达式可识别以下元字符：</p><ul><li><code>\\</code>：引用下一个元字符</li><li><code>^</code>：匹配文件的开头或在用作左括号后的第一个字符时否定字符类</li><li><code>$</code>：匹配文件末尾</li><li><code>.</code>：匹配除换行符之外的任何单个字符</li><li><code>|</code>：交替</li><li><code>()</code>：分组</li><li><code>[]</code>：带括号的字符类</li></ul><p>以下为量词：</p><ul><li><code>*</code>：匹配 0 次或多次</li><li><code>+</code>：匹配 1 次或多次</li><li><code>?</code>：匹配 0 或 1 次</li><li><code>{n}</code>：精确匹配 n 次</li><li><code>{n,}</code>：至少匹配 n 次</li><li><code>{,m}</code>：最多匹配 m 次</li><li><code>{n,m}</code>：匹配 n 到 m 次</li></ul><p>所有这些量词都有一个非贪婪变体，后跟一个问号 <code>?</code>：</p><ul><li><code>*?</code>：匹配 0 次或多次，非贪婪</li><li><code>+?</code>：匹配 1 次或多次，非贪婪</li><li><code>??</code>：匹配 0 次或 1 次，非贪婪</li><li><code>{n}?</code>：精确匹配 n 次，非贪婪</li><li><code>{n,}?</code>：至少匹配 n 次，非贪婪</li><li><code>{,m}?</code>：最多匹配 m 次，非贪婪</li><li><code>{n,m}?</code>：匹配 n 到 m 次，非贪婪</li></ul><p>可以识别以下转义序列：</p><ul><li><code>\\t</code>：水平制表符</li><li><code>\\n</code>：换行符</li><li><code>\\r</code>：回车符</li><li><code>\\f</code>：换页符</li><li><code>\\a</code>：警告响铃</li><li><code>\\xNN</code>：十六进制数的字符</li></ul><p>可识别的字符类</p><ul><li><code>\\w</code>：匹配单词字符 (字母数字加 &quot;_&quot;)</li><li><code>\\W</code>：匹配非单词字符</li><li><code>\\s</code>：匹配空白字符</li><li><code>\\S</code>：匹配非空白字符</li><li><code>\\d</code>：匹配十进制数字字符</li><li><code>\\D</code>：匹配非数字字符</li></ul><p>从版本 3.3.0 开始，这些零宽断言也被识别：</p><ul><li><code>\\b</code>：匹配单词边界</li><li><code>\\B</code>：除单词边界外的匹配</li></ul><h2 id="私有字符串" tabindex="-1">私有字符串 <a class="header-anchor" href="#私有字符串" aria-label="Permalink to &quot;私有字符串&quot;">​</a></h2><p>Yara 中的所有字符串都可以标记为 <code>private</code> 这意味着它们永远不会包含在 Yara 的输出中。它们在其他地方被视为普通字符串，因此仍然可以在条件下根据需要使用它们，但它们永远不会与 <code>-s</code> 标志一起显示，或者如果使用 C API。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule PrivateStringExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $text_string = &quot;foobar&quot; private</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $text_string</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="未引用的字符串" tabindex="-1">未引用的字符串 <a class="header-anchor" href="#未引用的字符串" aria-label="Permalink to &quot;未引用的字符串&quot;">​</a></h2><p>Yara 4.4.0 允许条件中存在未引用的字符串，如果字符串标识符以 <code>_</code> 开头，则不必在条件中引用它，任何其他字符串都必须在条件中引用。如果想要搜索特定字符串并在自定义回调中处理它们，但条件逻辑并不真正需要它们，那么这非常有用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule PrivateStringExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $_unreferenced = &quot;AXSERS&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        true</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="字符串修饰符总结" tabindex="-1">字符串修饰符总结 <a class="header-anchor" href="#字符串修饰符总结" aria-label="Permalink to &quot;字符串修饰符总结&quot;">​</a></h2><p>以下字符串修饰符按以下顺序处理，但仅适用于列出的字符串类型。</p><table tabindex="0"><thead><tr><th>关键字</th><th>字符串类型</th><th>说明</th><th>限制</th></tr></thead><tbody><tr><td><code>nocase</code></td><td>文本、正则表达式</td><td>忽略大小写</td><td>不能与 <code>xor</code>、<code>base64</code> 或 <code>base64wide</code> 一起使用</td></tr><tr><td><code>wide</code></td><td>文本、正则表达式</td><td>通过交错空 (0x00) 字符来模拟 UTF16</td><td>None</td></tr><tr><td><code>ascii</code></td><td>文本、正则表达式</td><td>也匹配 ASCII 字符，仅当使用 <code>wide</code> 时才需要</td><td>None</td></tr><tr><td><code>xor</code></td><td>文本</td><td>与单字节键异或文本字符串</td><td>不能与 <code>nocase</code>、<code>base64</code> 或 <code>base64wide</code> 一起使用</td></tr><tr><td><code>base64</code></td><td>文本</td><td>转换为 3 个 base64 编码的字符串</td><td>不能与 <code>nocase</code>、 <code>xor</code> 或 <code>fullword</code> 一起使用</td></tr><tr><td><code>base64wide</code></td><td>文本</td><td>转换为 3 个 base64 编码的字符串，然后交错空字符，如 <code>wide</code></td><td>不能与 <code>nocase</code>、 <code>xor</code> 或 <code>fullword</code> 一起使用</td></tr><tr><td><code>fullword</code></td><td>文本、正则表达式</td><td>匹配项前面或后面没有字母数字字符</td><td>不能与 <code>base64</code> 或 <code>base64wide</code> 一起使用</td></tr><tr><td><code>private</code></td><td>十六进制、文本、正则表达式</td><td>匹配从未包含在输出中</td><td>None</td></tr></tbody></table>`,103)]))}const g=a(i,[["render",l]]);export{u as __pageData,g as default};
