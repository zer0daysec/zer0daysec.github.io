import{_ as a,c as n,a3 as p,o as e}from"./chunks/framework.DtMx7FFi.js";const h=JSON.parse('{"title":"匹配条件","description":"","frontmatter":{"layout":"doc","title":"匹配条件"},"headers":[],"relativePath":"tools/yara/writerules/conditions.md","filePath":"tools/yara/writerules/conditions.md"}'),t={name:"tools/yara/writerules/conditions.md"};function i(o,s,l,c,d,r){return e(),n("div",null,s[0]||(s[0]=[p(`<div class="title-wrapper"><div class="page-title">匹配条件</div><div class="post-title">—— yara 使用手册 · 编写 yara 规则 <span class="lastModifyTime"><i class="fa-regular fa-clock"></i> 最后更新： 2023-03-07 10:17:22 </span></div></div><p>条件只不过是所有编程语言中都可以找到的布尔表达式，例如 if 语句，它们可以包含典型的布尔运算符 <code>and</code>、<code>or</code> 和 <code>not</code> 以及关系运算符 <code>&gt;=</code>、<code>&lt;=</code>、<code>&lt;</code>、<code>&gt;</code>、<code>==</code> 和 <code>!=</code>。此外，算术运算符 (<code>+</code>、<code>-</code>、<code>*</code>、<code>\\</code>、<code>%</code>) 和按位运算符 (<code>&amp;</code>、<code>|</code>、<code>&lt;&lt;</code>、<code>&gt;&gt;</code>、<code>~</code>、<code>^</code>) 可以是用于数字表达式。</p><p>整数始终是 64 位长，即使 <code>uint8</code>、<code>uint16</code> 和 <code>uint32</code> 等函数的结果也会提升为 64 位。这是必须考虑的事情，特别是在使用按位运算符时 (例如，~0x01 不是 0xFE，而是 0xFFFFFFFFFFFFFFFE)。</p><p>下表列出了所有运算符的优先级和结合性，该表按优先级降序排序，这意味着列表中较高行中列出的运算符将被分组到其下方行中列出的前面的运算符中。同一行中的运算符具有相同的优先级，如果它们一起出现在表达式中，则关联性决定它们的分组方式。</p><table tabindex="0"><thead><tr><th>优先级</th><th>操作符</th><th>描述</th><th>关联性</th></tr></thead><tbody><tr><td>1</td><td><code>[]</code><br><code>.</code></td><td>数组下标<br>结构成员访问</td><td>从左到右</td></tr><tr><td>2</td><td><code>-</code><br><code>~</code></td><td>负<br>按位非</td><td>从右到左</td></tr><tr><td>3</td><td><code>*</code><br><code>\\</code><br><code>%</code></td><td>乘<br>除<br>余</td><td>从左到右</td></tr><tr><td>4</td><td><code>+</code><br><code>-</code></td><td>加<br>减</td><td>从左到右</td></tr><tr><td>5</td><td><code>&lt;&lt;</code><br><code>&gt;&gt;</code></td><td>按位左移<br>按位右移</td><td>从左到右</td></tr><tr><td>6</td><td><code>&amp;</code></td><td>按位与</td><td>从左到右</td></tr><tr><td>7</td><td><code>^</code></td><td>按位异或</td><td>从左到右</td></tr><tr><td>8</td><td><code>|</code></td><td>按位或</td><td>从左到右</td></tr><tr><td>9</td><td><code>&lt;</code><br><code>&lt;=</code><br><code>&gt;</code><br><code>&gt;=</code></td><td>小于<br>小于或等于<br>大于<br>大于或等于</td><td>从左到右</td></tr><tr><td>10</td><td><code>==</code><br><code>!=</code><br><code>contains</code><br><code>icontains</code><br><code>startwith</code><br><code>istartwith</code><br><code>endwith</code><br><code>iendswith</code><br><code>iequals</code><br><code>matches</code></td><td>等于<br>不等于<br>包含子字符串<br>跟上面相似但不区分大小写<br>以子符串开头<br>与上面相似但不区分大小写<br>以子符串结尾<br>跟上面相似但不区分大小写<br>不区分大小写的字符串比较<br>字符串与正则表达式匹配</td><td>从左到右</td></tr><tr><td>11</td><td><code>not defined</code></td><td>逻辑 NOT 检查表达式是否已定义</td><td>从右到左</td></tr><tr><td>12</td><td><code>and</code></td><td>逻辑与</td><td>从左到右</td></tr><tr><td>13</td><td><code>or</code></td><td>逻辑或</td><td>从左到右</td></tr></tbody></table><p>字符串标识符也可以在条件中使用，充当布尔变量，其值取决于文件中关联字符串是否存在。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule Example</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;text1&quot;</span></span>
<span class="line"><span>        $b = &quot;text2&quot;</span></span>
<span class="line"><span>        $c = &quot;text3&quot;</span></span>
<span class="line"><span>        $d = &quot;text4&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        ($a or $b) and ($c or $d)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="计算字符串" tabindex="-1">计算字符串 <a class="header-anchor" href="#计算字符串" aria-label="Permalink to &quot;计算字符串&quot;">​</a></h2><p>有时我们不仅需要知道某个字符串是否存在，还需要知道该字符串在文件或进程内存中出现了多少次。每个字符串出现的次数由一个变量表示，该变量的名称是字符串标识符，但用 # 字符代替 $ 字符，例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule CountExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;dummy1&quot;</span></span>
<span class="line"><span>        $b = &quot;dummy2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        #a == 6 and #b &gt; 10</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>此规则匹配包含字符串 $a 的文件或进程正好六次以及字符串 $b 的出现次数超过十次。</p><p>从 Yara 4.2.0 开始，可以表达整数范围内字符串的计数，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#a in (filesize-500..filesize) == 2</span></span></code></pre></div><p>在此示例中，文件最后 500 个字节中 &quot;a&quot; 字符串的数量必须恰好等于 2。</p><h2 id="字符串偏移或虚拟地址" tabindex="-1">字符串偏移或虚拟地址 <a class="header-anchor" href="#字符串偏移或虚拟地址" aria-label="Permalink to &quot;字符串偏移或虚拟地址&quot;">​</a></h2><p>在大多数情况下，当在条件中使用字符串标识符时，我们愿意知道关联的字符串是否位于文件或进程内存中的位置，但有时需要知道该字符串是否位于文件或进程内存中的某个特定偏移处，文件或进程地址空间内的某个虚拟地址，在这种情况下，需要运算符 <code>at</code>，该运算符的用法如下例所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule AtExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;dummy1&quot;</span></span>
<span class="line"><span>        $b = &quot;dummy2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $a at 100 and $b at 200</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>仅当在文件内的偏移量 100 处 (或者如果应用于正在运行的进程，则在虚拟地址 100 处) 找到字符串 $a 时，上例中的表达式 <code>$a at 100</code> 才为 true。字符串 $b 应该出现在偏移量 200 处。请注意，两个偏移量都是十进制的，但是可以像 C 语言一样通过在数字前添加前缀 0x 来编写十六进制数字，这在编写虚拟地址时非常方便。另请注意运算符 <code>at</code> 的优先级高于 <code>and</code>。</p><p><code>at</code> 运算符允许在文件中某个固定偏移量或进程内存空间中的虚拟地址处搜索字符串，而 <code>in</code> 运算符允许在一定范围内搜索字符串偏移量或地址。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule InExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;dummy1&quot;</span></span>
<span class="line"><span>        $b = &quot;dummy2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $a in (0..100) and $b in (100..filesize)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在上面的示例中，字符串 $a 必须位于 0 到 100 之间的偏移量处，而字符串 $b 必须位于 100 到文件末尾之间的偏移量处，同样，默认情况下数字是十进制的。</p><p>还可以使用 @a[i] 获取字符串 $a 第 i 次出现的偏移量或虚拟地址。索引是基于 1 的，因此第一次出现是 @a[1]，第二次出现是 @a[2]，依此类推。如果提供的索引大于字符串出现的次数，则结果将为 NaN 值。</p><h2 id="匹配长度" tabindex="-1">匹配长度 <a class="header-anchor" href="#匹配长度" aria-label="Permalink to &quot;匹配长度&quot;">​</a></h2><p>对于许多包含跳转的正则表达式和十六进制字符串，匹配的长度是可变的。如果有正则表达式 <code>/fo*/</code>，则字符串 &quot;fo&quot;、&quot;foo&quot; 和 &quot;fooo&quot; 可以匹配，它们都具有不同的长度。</p><p>可以使用字符 <code>!</code> 来将匹配的长度作为条件的一部分，在字符串标识符前面，以类似的方式使用 <code>@</code> 字符作为偏移量。!a[1] 是 $a 第一个匹配的长度，!a[2] 是第二个匹配的长度，依此类推。 !a 是 !a[1] 的缩写形式。</p><h2 id="文件大小" tabindex="-1">文件大小 <a class="header-anchor" href="#文件大小" aria-label="Permalink to &quot;文件大小&quot;">​</a></h2><p>字符串标识符并不是唯一可以出现在条件中的变量 (事实上可以在没有任何字符串定义的情况下定义规则)，还可以使用其他特殊变量。这些特殊变量之一是 <code>filesize</code>，正如其名称所示，它保存正在扫描的文件的大小，大小以字节表示。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule FileSizeExample</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        filesize &gt; 200KB</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>前面的示例还演示了 KB 后缀的使用，当该后缀附加到数字常量时，会自动将该常量的值乘以 1024。MB 后缀可用于将该值乘以 2 ^ 20，两个后缀只能与十进制常量一起使用。</p><p>仅当规则应用于文件时，使用 <code>filesize</code> 才有意义。如果规则应用于正在运行的进程，它将永远不会匹配，因为 <code>filesize</code> 在此上下文中没有意义。</p><h2 id="入口点" tabindex="-1">入口点 <a class="header-anchor" href="#入口点" aria-label="Permalink to &quot;入口点&quot;">​</a></h2><p>可以在规则中使用的另一个特殊变量是 <code>entrypoint</code>，如果文件是可移植可执行文件 (PE) 或可执行可链接格式 (ELF)，则此变量保存可执行文件入口点的原始偏移量。如果我们正在扫描正在运行的进程，入口点将保存可执行文件入口点的虚拟地址，此变量的典型用途是在入口点查找某种模式以检测加壳程序或简单文件感染程序。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule EntryPointExample1</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = { E8 00 00 00 00 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $a at entrypoint</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rule EntryPointExample2</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = { 9C 50 66 A1 ?? ?? ?? 00 66 A9 ?? ?? 58 0F 85 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $a in (entrypoint..entrypoint + 10)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>规则中 <code>entrypoint</code> 变量的存在意味着只有 PE 或 ELF 文件可以满足该规则，如果文件不是 PE 或 ELF，则任何使用此变量的规则都会计算为 false。</p><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p><code>entrypoint</code> 变量已弃用，应该使用 PE 模块中的 <code>pe.entry_point</code> 来代替。从 Yara 3.0 开始，如果使用 <code>entrypoint</code> 将收到警告，并且将在未来版本中完全删除。</p></div><h2 id="访问给定位置的数据" tabindex="-1">访问给定位置的数据 <a class="header-anchor" href="#访问给定位置的数据" aria-label="Permalink to &quot;访问给定位置的数据&quot;">​</a></h2><p>在很多情况下，可能需要编写依赖于存储在某个文件偏移或虚拟内存地址的数据的条件，具体取决于是否正在扫描文件或正在运行的进程。在这些情况下可以使用以下函数之一从给定偏移处的文件中读取数据：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int8(&lt;offset or virtual address&gt;)</span></span>
<span class="line"><span>int16(&lt;offset or virtual address&gt;)</span></span>
<span class="line"><span>int32(&lt;offset or virtual address&gt;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>uint8(&lt;offset or virtual address&gt;)</span></span>
<span class="line"><span>uint16(&lt;offset or virtual address&gt;)</span></span>
<span class="line"><span>uint32(&lt;offset or virtual address&gt;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int8be(&lt;offset or virtual address&gt;)</span></span>
<span class="line"><span>int16be(&lt;offset or virtual address&gt;)</span></span>
<span class="line"><span>int32be(&lt;offset or virtual address&gt;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>uint8be(&lt;offset or virtual address&gt;)</span></span>
<span class="line"><span>uint16be(&lt;offset or virtual address&gt;)</span></span>
<span class="line"><span>uint32be(&lt;offset or virtual address&gt;)</span></span></code></pre></div><p><code>intXX</code> 函数从偏移或虚拟地址读取 8、16 和 32 位有符号整数，而函数 <code>uintXX</code> 读取无符号整数。16 位和 32 位整数均被视为小端整数。如果想读取大端整数，请使用以 be 结尾的相应函数。参数可以是返回无符号整数的任何表达式，包括 <code>uintXX</code> 函数本身的返回值。作为例子，看一下区分 PE 文件的规则：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule IsPE</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        // MZ signature at offset 0 and ...</span></span>
<span class="line"><span>        uint16(0) == 0x5A4D and</span></span>
<span class="line"><span>        // ... PE signature at offset stored in MZ header at 0x3C</span></span>
<span class="line"><span>        uint32(uint32(0x3C)) == 0x00004550</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="字符串集合" tabindex="-1">字符串集合 <a class="header-anchor" href="#字符串集合" aria-label="Permalink to &quot;字符串集合&quot;">​</a></h2><p>在某些情况下，有必要表示文件应包含给定集合中的某些数字字符串。集合中的任何字符串都不需要存在，但至少其中一些应该存在。在这些情况下可以使用 <code>of</code> 运算符。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule OfExample1</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;dummy1&quot;</span></span>
<span class="line"><span>        $b = &quot;dummy2&quot;</span></span>
<span class="line"><span>        $c = &quot;dummy3&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        2 of ($a,$b,$c)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>此规则要求文件中必须存在集合 <code>($a,$b,$c)</code> 中的至少两个字符串，但哪两个并不重要。当然，使用该运算符时，<code>of</code> 关键字之前的数量必须小于或等于集合中字符串的数量。</p><p>该集合的元素可以像前面的示例一样显式枚举，也可以使用通配符指定。例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule OfExample2</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $foo1 = &quot;foo1&quot;</span></span>
<span class="line"><span>        $foo2 = &quot;foo2&quot;</span></span>
<span class="line"><span>        $foo3 = &quot;foo3&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        2 of ($foo*)  // equivalent to 2 of ($foo1,$foo2,$foo3)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rule OfExample3</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $foo1 = &quot;foo1&quot;</span></span>
<span class="line"><span>        $foo2 = &quot;foo2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        $bar1 = &quot;bar1&quot;</span></span>
<span class="line"><span>        $bar2 = &quot;bar2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        3 of ($foo*,$bar1,$bar2)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>甚至可以使用 <code>($*)</code> 来引用规则中的所有字符串，或者编写等效的关键字 <code>them</code> 以提高易读性。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule OfExample4</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;dummy1&quot;</span></span>
<span class="line"><span>        $b = &quot;dummy2&quot;</span></span>
<span class="line"><span>        $c = &quot;dummy3&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        1 of them // equivalent to 1 of ($*)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在上面的所有示例中，字符串的数量均由数值常量指定，但可以使用任何返回数值的表达式。也可以使用关键字 <code>any</code>、<code>all</code> 和 <code>none</code>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>all of them       // all strings in the rule</span></span>
<span class="line"><span>any of them       // any string in the rule</span></span>
<span class="line"><span>all of ($a*)      // all strings whose identifier starts by $a</span></span>
<span class="line"><span>any of ($a,$b,$c) // any of $a, $b or $c</span></span>
<span class="line"><span>1 of ($*)         // same that &quot;any of them&quot;</span></span>
<span class="line"><span>none of ($b*)     // zero of the set of strings that start with &quot;$b&quot;</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>由于 Yara 内部的工作方式，&quot;0 of them&quot; 是语言中含糊不清的部分，应避免使用，取而代之的是 &quot;none of them&quot;。要理解这一点，请考虑 &quot;2 of them&quot; 的含义，如果 2 个或更多字符串匹配，则为 true。从过去上看，&quot;0 of them&quot; 遵循这一原则，如果至少有一个字符串匹配，则结果为 true。在 Yara 4.3.0 中，如果恰好有 0 个字符串匹配，则通过使 &quot;0 of them&quot; 计算为 true 来解决这种歧义。为了改善这种情况并明确意图，鼓励使用 &quot;none&quot; 代替 0，这样可以更容易地推理出 &quot;none of them&quot; 的含义。</p></div><p>从 Yara 4.2.0 开始，可以在整数范围内表达一组字符串，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>all of ($a*) in (filesize-500..filesize)</span></span>
<span class="line"><span>any of ($a*, $b*) in (1000..2000)</span></span></code></pre></div><p>从 Yara 4.3.0 开始，可以在特定偏移处表达一组字符串，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>any of ($a*) at 0</span></span></code></pre></div><h2 id="对许多字符串应用相同匹配条件" tabindex="-1">对许多字符串应用相同匹配条件 <a class="header-anchor" href="#对许多字符串应用相同匹配条件" aria-label="Permalink to &quot;对许多字符串应用相同匹配条件&quot;">​</a></h2><p>还有另一个运算符与 <code>of</code> 非常相似，但功能更强大，即 <code>for..of</code> 运算符，语法是：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for expression of string_set : ( boolean_expression )</span></span></code></pre></div><p>其含义是：<code>string_set</code> 中的字符串中至少有 <code>expression</code> 必须满足 <code>boolean_expression</code>。</p><p>换句话说：对 <code>string_set</code> 中的每个字符串进行 <code>boolean_expression</code> 计算，并且必须至少有 expression 返回 True。</p><p>当然，<code>boolean_expression</code> 可以是规则的条件部分接受的任何布尔表达式，除了一个重要的细节：这里可以使用美元符号 ($) 作为占位符正在给字符串作判断，看看下面的表达式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for any of ($a,$b,$c) : ( $ at pe.entry_point  )</span></span></code></pre></div><p>布尔表达式中的 $ 符号不绑定到任何特定字符串，在表达式的三个连续计算中，它将是 $a，然后是 $b，然后是 $c。</p><p>也许你已经意识到 <code>of</code> 运算符是 <code>for..of</code> 的特殊情况，以下表达式是相同的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>any of ($a,$b,$c)</span></span>
<span class="line"><span>for any of ($a,$b,$c) : ( $ )</span></span></code></pre></div><p>还可以使用符号 #、@ 和 ! 分别代表每个字符串的出现次数、第一个偏移量和长度。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for all of them : ( # &gt; 3 )</span></span>
<span class="line"><span>for all of ($a*) : ( @ &gt; @b )</span></span></code></pre></div><p>从 Yara 4.3.0 开始，可以通过文本字符串表达条件，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for any s in (&quot;71b36345516e076a0663e0bea97759e4&quot;, &quot;1e7f7edeb06de02f2c2a9319de99e033&quot;) : ( pe.imphash() == s )</span></span></code></pre></div><p>这里值得记住的是，规则中引用的两个哈希是普通文本字符串，与规则的字符串部分无关。在循环条件内，<code>pe.impash()</code> 函数的结果与每个文本字符串进行比较，从而产生更简洁的规则。</p><h2 id="将匿名字符串与-of-和-for-of-一起使用" tabindex="-1">将匿名字符串与 of 和 for..of 一起使用 <a class="header-anchor" href="#将匿名字符串与-of-和-for-of-一起使用" aria-label="Permalink to &quot;将匿名字符串与 of 和 for..of 一起使用&quot;">​</a></h2><p>当使用 <code>of</code> 和 <code>for..of</code> 运算符后跟 <code>them</code> 时，分配给规则的每个字符串的标识符通常是多余的。由于没有单独引用任何字符串，因此不需要为每个字符串提供唯一的标识符。在这些情况下，可以声明带有仅由 $ 字符组成的标识符的匿名字符串，如下例所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule AnonymousStrings</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $ = &quot;dummy1&quot;</span></span>
<span class="line"><span>        $ = &quot;dummy2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        1 of them</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="迭代字符串出现的次数" tabindex="-1">迭代字符串出现的次数 <a class="header-anchor" href="#迭代字符串出现的次数" aria-label="Permalink to &quot;迭代字符串出现的次数&quot;">​</a></h2><p>如字符串偏移量或虚拟地址中所示，给定字符串出现在文件或进程地址空间中的偏移量或虚拟地址可以使用语法 @a[i] 进行访问，其中 i 是字符串出现的索引，表示你所指的字符串 $a 的哪一个出现 (@a[1]，@a[2]，...)。</p><p>有时需要迭代其中一些偏移量并保证它们满足给定条件，在这种情况下可以使用 <code>for..in</code>，例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule Occurrences</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;dummy1&quot;</span></span>
<span class="line"><span>        $b = &quot;dummy2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        for all i in (1,2,3) : ( @a[i] + 10 == @b[i] )</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>前面的规则规定，$b 的第一次出现应该在 $a 第一次出现之后 10 个字节，并且两个字符串的第二次和第三次出现也应该发生同样的情况。</p><p>相同的条件也可以写成：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for all i in (1..3) : ( @a[i] + 10 == @b[i] )</span></span></code></pre></div><p>请注意，使用范围 (1..3)，而不是枚举索引值 (1,2,3)。当然不必强制使用常量来指定范围边界，也可以使用表达式，如下例所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for all i in (1..#a) : ( @a[i] &lt; 100 )</span></span></code></pre></div><p>在本例中，迭代 $a 的每次出现 (请记住 #a 代表 $a 出现的次数)，此规则指定 $a 的每次出现都应位于文件的前 100 个字节内。</p><p>如果想表达只有某些字符串出现才能满足条件，则 <code>for..of</code> 运算符中的相同逻辑适用于此处：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for any i in (1..#a) : ( @a[i] &lt; 100 )</span></span>
<span class="line"><span>for 2 i in (1..#a) : ( @a[i] &lt; 100 )</span></span></code></pre></div><p><code>for..in</code> 运算符与 <code>for..of</code> 类似，但后者迭代一组字符串，而前者迭代范围、枚举、数组和字典。</p><h2 id="迭代器" tabindex="-1">迭代器 <a class="header-anchor" href="#迭代器" aria-label="Permalink to &quot;迭代器&quot;">​</a></h2><p>在 Yara 4.0 中，<code>for..in</code> 运算符得到了改进，现在它不仅可以用于迭代整数枚举和范围 (例如：1,2,3,4 和 1..4)，还可以用于迭代任何一种可迭代的数据类型，如 Yara 模块定义的数组和字典。例如，以下表达式在 Yara 4.0 中有效：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for any section in pe.sections : ( section.name == &quot;.text&quot; )</span></span></code></pre></div><p>相当于</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for any i in (0..pe.number_of_sections-1) : ( pe.sections[i].name == &quot;.text&quot; )</span></span></code></pre></div><p>新语法更加自然且易于理解，是在较新版本的 Yara 中表达此类条件的推荐方式。</p><p>迭代字典时，必须提供两个变量名称来保存字典中每个条目的键和值，例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for any k,v in some_dict : ( k == &quot;foo&quot; and v == &quot;bar&quot; )</span></span></code></pre></div><p>一般来说，<code>for..in</code> 运算符的形式如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for &lt;quantifier&gt; &lt;variables&gt; in &lt;iterable&gt; : ( &lt;some condition using the loop variables&gt; )</span></span></code></pre></div><p>其中 是任意、全部或一个表达式，其计算结果为迭代器中必须满足条件的项目数， 是一个以逗号分隔的变量名称列表，用于保存当前项目的值（变量的数量取决于 的类型），并且 是可以迭代的东西。</p><p>其中 <code>quantifier</code> 是任意、全部或计算为迭代器中必须满足条件的项数的表达式，<code>variables</code> 是一个逗号分隔的变量名列表，其中包含当前项的值 (变量数取决于 <code>iterable</code> 的类型)，<code>iteraable</code> 是可迭代的。</p><h2 id="引用其它规则" tabindex="-1">引用其它规则 <a class="header-anchor" href="#引用其它规则" aria-label="Permalink to &quot;引用其它规则&quot;">​</a></h2><p>在编写规则的条件时，还可以以类似于传统编程语言的函数调用的方式引用先前定义的规则。通过这种方式，可以创建依赖于其他规则的规则，来看一个例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule Rule1</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;dummy1&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $a</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rule Rule2</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;dummy2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $a and Rule1</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>从示例中可以看出，只有当文件包含字符串 &quot;dummy2&quot; 并满足 Rule1 时，它才会满足 Rule2。请注意，必须在调用之前定义好要调用的规则。</p><p>4.2.0 中引入了另一种引用其他规则的方法，即规则集，其操作方式与字符串集类似 (请参阅字符串集合)，例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule Rule1</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;dummy1&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $a</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rule Rule2</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;dummy2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        $a</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rule MainRule</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    strings:</span></span>
<span class="line"><span>        $a = &quot;dummy2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    condition:</span></span>
<span class="line"><span>        any of (Rule*)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>此示例演示如何使用规则集以随规则自动增长的方式描述高阶逻辑，如果在 MainRule 之前定义另一个名为 Rule3 的规则，那么它将自动包含在 MainRule 条件中 Rule* 的扩展中。</p><p>要使用规则集，包含的所有规则都必须在使用规则集之前存在。例如，以下内容将产生编译器错误，因为 a2 是在 x 中使用规则集之后定义的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rule a1 { condition: true }</span></span>
<span class="line"><span>rule x { condition: 1 of (a*) }</span></span>
<span class="line"><span>rule a2 { condition: true }</span></span></code></pre></div>`,107)]))}const b=a(t,[["render",i]]);export{h as __pageData,b as default};
