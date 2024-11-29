import{_ as s,c as i,a3 as e,o as t}from"./chunks/framework.DtMx7FFi.js";const d=JSON.parse('{"title":"编译和安装 yara","description":"","frontmatter":{"layout":"doc","title":"编译和安装 yara"},"headers":[],"relativePath":"tools/yara/start/compile-and-install.md","filePath":"tools/yara/start/compile-and-install.md"}'),n={name:"tools/yara/start/compile-and-install.md"};function l(p,a,h,o,r,c){return t(),i("div",null,a[0]||(a[0]=[e(`<div class="title-wrapper"><div class="page-title">编译和安装</div><div class="post-title">—— yara 使用手册 · 开始 <span class="lastModifyTime"><i class="fa-regular fa-clock"></i> 最后更新： 2023-03-07 11:27:53 </span></div></div><p>下载 Yara 源代码到本地并准备编译它：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -zxf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yara-4.4.0.tar.gz</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yara-4.4.0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./bootstrap.sh</span></span></code></pre></div><p>确保你的系统中安装了 <code>automake</code>、<code>libtool</code>、<code>make</code>、<code>gcc</code> 和 <code>pkg-config</code>。Ubuntu 和 Debian 用户使用以下命令：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> automake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libtool</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gcc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pkg-config</span></span></code></pre></div><p>如果你计划修改 Yara 源代码，可能还需要 <code>flex</code> 和 <code>bison</code> 来生成词法分析器和解析器：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> flex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bison</span></span></code></pre></div><p>按照标准方式编译并安装 Yara：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./bootstrap.sh</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./configure</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div><p>运行测试用例以确保一切正常：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> check</span></span></code></pre></div><p>Yara 的一些功能依赖于 OpenSSL 库，仅当你的系统中安装了 OpenSSL 库时，才会启用这些功能。如果没有，Yara 可以正常工作，但无法使用禁用的功能。<code>configure</code> 脚本将自动检测是否安装了 OpenSSL。如果想要强制执行依赖于 OpenSSL 的功能，需要指定 <code>--with-crypto</code> 参数。Ubuntu 和 Debian 用户可以使用 <code>sudo apt-get install libssl-dev</code> 安装 OpenSSL 库。</p><p>默认情况下，以下模块不会编译到 Yara 中：</p><ul><li>cuckoo</li><li>magic</li><li>dotnet</li></ul><p>如果打算使用它们，则需要指定 <code>--enable-&lt;module name&gt;</code> 参数。</p><p>例如：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./configure</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --enable-cuckoo</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./configure</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --enable-magic</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./configure</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --enable-dotnet</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./configure</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --enable-cuckoo</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --enable-magic</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --enable-dotnet</span></span></code></pre></div><p>模块通常依赖于外部库，根据选择安装的模块，需要以下库：</p><ul><li>cuckoo：依赖 <a href="http://www.digip.org/jansson/" target="_blank" rel="noreferrer">Jansson</a> 来解析 JSON。某些 Ubuntu 和 Debian 版本已经包含名为 <code>libjansson-dev</code> 的软件包，如果 <code>sudo apt-get install libjansson-dev</code> 命令执行失败，则从其 <a href="https://github.com/akheron/jansson" target="_blank" rel="noreferrer">存储库</a> 中获取源代码。</li><li>magic：依赖于 libmagic，一个 Unix 标准程序文件使用的库。 Ubuntu、Debian 和 CentOS 包含一个软件包 <code>libmagic-dev</code> 。源代码可以在 <a href="ftp://ftp.astron.com/pub/file/" target="_blank" rel="noreferrer">这里</a> 找到。</li></ul><h2 id="使用-vcpkg-安装" tabindex="-1">使用 vcpkg 安装 <a class="header-anchor" href="#使用-vcpkg-安装" aria-label="Permalink to &quot;使用 vcpkg 安装&quot;">​</a></h2><p>可以使用 <a href="https://github.com/Microsoft/vcpkg/" target="_blank" rel="noreferrer">vcpkg</a> 依赖项管理器下载并安装 Yara：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/microsoft/vcpkg.git</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vcpkg</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./bootstrap-vcpkg.sh</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./vcpkg</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> integrate</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vcpkg</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yara</span></span></code></pre></div><p>vcpkg 中的 Yara 端口由 Microsoft 团队成员和社区贡献者保持最新，如果版本已过时，请在 vcpkg 存储库上 <a href="https://github.com/Microsoft/vcpkg/" target="_blank" rel="noreferrer">创建问题或拉取请求</a>。</p><h2 id="在-windows-上安装" tabindex="-1">在 Windows 上安装 <a class="header-anchor" href="#在-windows-上安装" aria-label="Permalink to &quot;在 Windows 上安装&quot;">​</a></h2><p>可在 <a href="https://github.com/VirusTotal/yara/releases/latest" target="_blank" rel="noreferrer">此处</a> 找到 32 位和 64 位版本的二进制文件，只需下载所需的版本并解压缩即可。</p><p>要使用 <a href="https://scoop.sh/" target="_blank" rel="noreferrer">Scoop</a> 或 <a href="https://chocolatey.org/" target="_blank" rel="noreferrer">Chocolatey</a> 安装 Yara，只需输入 <code>scoop install yara</code> 或 <code>choco install yara</code>。与 Scoop 和 Chocolatey 的集成不是由他们各自的团队维护的，也不是由 Yara 作者维护的。</p><h2 id="在-mac-os-x-上使用-homebrew-安装" tabindex="-1">在 Mac OS X 上使用 Homebrew 安装 <a class="header-anchor" href="#在-mac-os-x-上使用-homebrew-安装" aria-label="Permalink to &quot;在 Mac OS X 上使用 Homebrew 安装&quot;">​</a></h2><p>要使用 Homebrew 安装 Yara，只需输入 <code>brew install yara</code>。</p><h2 id="安装-yara-python" tabindex="-1">安装 yara-python <a class="header-anchor" href="#安装-yara-python" aria-label="Permalink to &quot;安装 yara-python&quot;">​</a></h2><p>如果想在 Python 脚本使用 Yara，则需要安装 <code>yara-python</code> 扩展。请参阅 <a href="https://github.com/VirusTotal/yara-python" target="_blank" rel="noreferrer">https://github.com/VirusTotal/yara-python</a> 了解如何安装它的说明。</p>`,30)]))}const g=s(n,[["render",l]]);export{d as __pageData,g as default};
