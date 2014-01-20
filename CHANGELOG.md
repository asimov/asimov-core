<a name="v0.0.63"></a>
### v0.0.63 (2014-01-20)


#### Bug Fixes

* **requirejs:** generate module definitions ([bbe20588](http://github.com/asimov/asimov-core/commit/bbe20588800da8d48042a77e8c27e851cf4931c5))

<a name="v0.0.62"></a>
### v0.0.62 (2014-01-20)


#### Bug Fixes

* **build:** add support for requirejs shims ([7cdbe4b4](http://github.com/asimov/asimov-core/commit/7cdbe4b4a922fb32282cac5035913bfa905903b0))

<a name="v0.0.61"></a>
### v0.0.61 (2014-01-15)


#### Features

* **responsive-property:** allow the value to be a lazy ([e3c9e582](http://github.com/asimov/asimov-core/commit/e3c9e582ca2c4217a4e3d49f19fff9239e164ee2))

<a name="v0.0.60"></a>
### v0.0.60 (2014-01-14)


#### Features

* **numbers:** add number helper functions ([809ea9b6](http://github.com/asimov/asimov-core/commit/809ea9b69eadb709794294ed6be1901d10bcca30))

<a name="v0.0.59"></a>
### v0.0.59 (2014-01-13)


#### Features

* **aliases:** make resolve-alias more robust ([9fc86c70](http://github.com/asimov/asimov-core/commit/9fc86c7029d6f9b2aa7beb2a1a878e58798b0348))

<a name="v0.0.58"></a>
### v0.0.58 (2014-01-13)


#### Bug Fixes

* **responsive-property:** don't proxy value through get ([695fea90](http://github.com/asimov/asimov-core/commit/695fea9034583e325d6b80fb3250518f041583b7))


#### Features

* **clearfix:** add a clearfix mixin ([e7173c02](http://github.com/asimov/asimov-core/commit/e7173c02bfdf9e324d719ecb289d12a9da7b73cf))
* **lazy:** allow lazys to take lazys as arguments ([142247c8](http://github.com/asimov/asimov-core/commit/142247c8279b06f909633c32a9e9936f0d78877c))

<a name="v0.0.57"></a>
### v0.0.57 (2014-01-09)


#### Bug Fixes

* **theme:** small breakpoint should be max-width ([43874ddc](http://github.com/asimov/asimov-core/commit/43874ddc821c33b6a718e68e1d0a2d0be4ccd912))

<a name="v0.0.56"></a>
### v0.0.56 (2014-01-09)


#### Features

* **build:** easier docs theming ([92c0cdec](http://github.com/asimov/asimov-core/commit/92c0cdeca7124b402fd7bb703164cbe7f67f259f))

<a name="v0.0.55"></a>
### v0.0.55 (2014-01-09)


#### Features

* **build:** easier docs theming ([ece94803](http://github.com/asimov/asimov-core/commit/ece948035f23d04a0a7af29834ff0ace06cfa320))

<a name="v0.0.54"></a>
### v0.0.54 (2014-01-09)


#### Bug Fixes

* **docs:** only apply pretty print for code samples ([8b5ea62d](http://github.com/asimov/asimov-core/commit/8b5ea62d2273f56b9d0c7349b6a27c092c191fbf))

<a name="v0.0.53"></a>
### v0.0.53 (2014-01-09)


#### Bug Fixes

* **core:** get should resolve aliases ([e8bbd892](http://github.com/asimov/asimov-core/commit/e8bbd89239611ab3a99a90ad1382f4c89f21d2e7))
* **docs:** docs should reflow ([1f35e52f](http://github.com/asimov/asimov-core/commit/1f35e52f43ac611a101284b03e1b97efc4de7afe))

<a name="v0.0.52"></a>
### v0.0.52 (2014-01-08)


#### Bug Fixes

* **core:** tweak settings merging ([97488422](http://github.com/asimov/asimov-core/commit/974884224beddaaa0fbbca76bf8f970d1bcadf16))
* **settings:** breakpoints setting is now breakpoint ([cf2c27f5](http://github.com/asimov/asimov-core/commit/cf2c27f5dc508113865dbabc2640088d6ea5b3f0))


#### Features

* **docs:** fix layout classes ([7506d0b1](http://github.com/asimov/asimov-core/commit/7506d0b14358717299f01b79e623acc6a48f3184))

<a name="v0.0.51"></a>
### v0.0.51 (2014-01-08)


#### Features

* **core:**
  * resolve-aliases should be recursive ([302ec209](http://github.com/asimov/asimov-core/commit/302ec2092c2a832c51ea8930bc3fbc3218c88d53))
  * simplify flatten-map() ([04365a88](http://github.com/asimov/asimov-core/commit/04365a889eaaf5f3bdea89c88d12be549919d924))
  * remove unnecessary recursion from get() ([577140f4](http://github.com/asimov/asimov-core/commit/577140f4e368423be06cf104a0c1543ed43c74b9))
  * re-add the cache and debug APIs ([17f853ee](http://github.com/asimov/asimov-core/commit/17f853ee2c82fcd04b64ee52022eb79d9dc58b76))
* **perf:** speed up resolving aliases with the internal cache ([f865a35e](http://github.com/asimov/asimov-core/commit/f865a35ebe3105238b5008031377b239b3c056e9))

<a name="v0.0.50"></a>
### v0.0.50 (2014-01-07)


#### Bug Fixes

* **core:** get() sometimes incorrectly sets  to ([34daaa59](http://github.com/asimov/asimov-core/commit/34daaa5966eb1607394e1f7231f2541bb25cbe26))

<a name="v0.0.49"></a>
### v0.0.49 (2014-01-07)


#### Bug Fixes

* **build:**
  * don't run prepare task on core ([ad293a26](http://github.com/asimov/asimov-core/commit/ad293a261af7db0d13db616cbe72fbc3fd50cb40))
  * run component's prepare in the correct context ([44024709](http://github.com/asimov/asimov-core/commit/44024709ea501f5c96b4d0fed5fd30a1eb6dea75))

<a name="v0.0.48"></a>
### v0.0.48 (2014-01-07)


#### Features

* **build:** themes need to run each components prepare ([12b353b1](http://github.com/asimov/asimov-core/commit/12b353b103be2fe837e8c5acf6821d1888df5082))

<a name="v0.0.47"></a>
### v0.0.47 (2014-01-07)


#### Features

* **build:** load component's npm deps before running prepare ([ac1f2f51](http://github.com/asimov/asimov-core/commit/ac1f2f51e8763aaf759aa39145632ed503d03bdf))

<a name="v0.0.46"></a>
### v0.0.46 (2014-01-07)


#### Features

* **build:** add a prepare task hook ([3d70fc00](http://github.com/asimov/asimov-core/commit/3d70fc003e6686a25973f45983a8fd05ce67ce0c))

<a name="v0.0.45"></a>
### v0.0.45 (2014-01-07)


#### Bug Fixes

* **build:**
  * patch for require js bug ([14ff7938](http://github.com/asimov/asimov-core/commit/14ff793868dc67bcf4c533580d0c03b0ebd64140))
  * fix requirejs paths for component deps ([3aa24e49](http://github.com/asimov/asimov-core/commit/3aa24e4994317aea331c720d4ee1b766570507d3))

<a name="v0.0.44"></a>
### v0.0.44 (2014-01-03)


#### Features

* **build:** correctly compile js in themes ([14c99ca6](http://github.com/asimov/asimov-core/commit/14c99ca6ad6d02bd0ea83ac8c554773da7c7d271))

<a name="v0.0.43"></a>
### v0.0.43 (2014-01-02)

<a name="v0.0.42"></a>
### v0.0.42 (2013-12-20)


#### Bug Fixes

* **build:** watch doc assets in dev ([fcdeee03](http://github.com/asimov/asimov-core/commit/fcdeee03fb82167fd34ebee8aeb32230525f77a5))
* **settings:** use some saner default media queries ([cff942ec](http://github.com/asimov/asimov-core/commit/cff942ecb30e3f2bd924b246eae8fae7e04bb143))


#### Features

* **docs:** add a default docs theme ([485655fe](http://github.com/asimov/asimov-core/commit/485655fe6ab00d0d6981cf0e869276868c10669b))
* **mixins:** added the responsive property mixin ([545187db](http://github.com/asimov/asimov-core/commit/545187dba492bd0c20cb66982b7f43c23d4e8038))

<a name="v0.0.41"></a>
### v0.0.41 (2013-12-17)


#### Features

* **build:** don't validate 3rdparty js ([7d295365](http://github.com/asimov/asimov-core/commit/7d295365c71005147fbf56ba15891c219e634a75))

<a name="v0.0.40"></a>
### v0.0.40 (2013-12-16)


#### Bug Fixes

* **dist:** sync required assets from asimov dependencies ([31b23604](http://github.com/asimov/asimov-core/commit/31b23604f5c537ec0595a83ef669533caea84533))
* **settings:** some functions were incorrectly namespacing settings ([3936f71c](http://github.com/asimov/asimov-core/commit/3936f71c17987c9480fa68285e116570319f057b))


#### Features

* **scss:** secondary colors in core settings ([96d62ebc](http://github.com/asimov/asimov-core/commit/96d62ebcc9ea5dc557cf80539e756f1d3012970b))
* **theme:**
  * some tweaks to the default theme ([42d5e47f](http://github.com/asimov/asimov-core/commit/42d5e47f70612c2c198e7e69c241b5a030e9faf9))
  * add the neutral colour palette ([93fd25f1](http://github.com/asimov/asimov-core/commit/93fd25f16bbc6b8b967f3b464b8800384126d582))
  * some tweaks to the default theme ([a4617b2e](http://github.com/asimov/asimov-core/commit/a4617b2e30fab5396eff72188a0cb50ffb72176f))

<a name="v0.0.39"></a>
### v0.0.39 (2013-12-12)


#### Features

* **build:** bump grunt-contrib-sass to simplify grunt sass config ([fcfc808f](http://github.com/asimov/asimov-core/commit/fcfc808f0bcc082a7123f8f915de2b7f8f5e0ae5))

<a name="v0.0.38"></a>
### v0.0.38 (2013-12-12)


#### Features

* **build:** allow components to define requirejs paths ([dbd9f396](http://github.com/asimov/asimov-core/commit/dbd9f396b308466de38940c547f0cbbc468a6865))

<a name="v0.0.37"></a>
### v0.0.37 (2013-12-12)


#### Features

* **dist:** sync non sass and js files to dist ([31c018a3](http://github.com/asimov/asimov-core/commit/31c018a3157322f1495be38621dd46f3c2c23ff6))
* **docs:** allow themeing of docs ([6059aa1c](http://github.com/asimov/asimov-core/commit/6059aa1cb1fcf2f18f54bb3d547a12e3993567d1))
* **theme:** add some extra border-radiuses ([e2828c23](http://github.com/asimov/asimov-core/commit/e2828c234dd393b07d3184fbdf930cd4732ee2ea))

<a name="v0.0.36"></a>
### v0.0.36 (2013-12-10)


#### Bug Fixes

* **theme:** fix some bugs in the default theme ([8f93a5a0](http://github.com/asimov/asimov-core/commit/8f93a5a007ffadbae04684608685901d89dfd86e))


#### Features

* **setting:** give resolve-alias wings ([10b20e17](http://github.com/asimov/asimov-core/commit/10b20e17c52477f2f712ea0b377ea29f85a5d0a4))

<a name="v0.0.35"></a>
### v0.0.35 (2013-12-10)


#### Bug Fixes

* **settings:** revert resolve aliases on write ([4c5f6d1c](http://github.com/asimov/asimov-core/commit/4c5f6d1c0a7e60b0fbff2c79a11dea9da068b0f8))


#### Features

* **lazy:** add lazy function evaluation for setting values ([95acc73b](http://github.com/asimov/asimov-core/commit/95acc73b7c1ae562dca3507e16a6bc54c4059c5f))
* **settings:** resolves aliases on read ([7d9c4a6e](http://github.com/asimov/asimov-core/commit/7d9c4a6e828e8d0e5842d6a42e3bc762fbca85f6))

<a name="v0.0.34"></a>
### v0.0.34 (2013-12-10)


#### Features

* **settings:**
  * resolve aliases on write ([ef9803d8](http://github.com/asimov/asimov-core/commit/ef9803d8df1aa68f588df07709c018bde45b0d21))
  * back lookup() onto get() for developer happiness ([981419ca](http://github.com/asimov/asimov-core/commit/981419ca3514352c2baab3a2dd2233402c28b5f2))
* **theme:** ship with a basic default theme ([a7699821](http://github.com/asimov/asimov-core/commit/a7699821cfe4e89379955023507df48a90f807d0))

<a name="v0.0.33"></a>
### v0.0.33 (2013-12-09)


#### Bug Fixes

* **jshint:** predefine the asimov global ([fb1f7baa](http://github.com/asimov/asimov-core/commit/fb1f7baa63db5848f76e22a0a692299d7e0348d5))

<a name="v0.0.32"></a>
### v0.0.32 (2013-12-09)


#### Bug Fixes
* **build:** run sass with bundler ([3b080d8a](http://github.com/asimov/asimov-core/commit/3b080d8a4e988c56d5d962cd46d3c599f3e69372))

<a name="v0.0.31"></a>
### v0.0.31 (2013-12-06)


#### Features

* **cache:** remove internal cache madness for now ([d3d77c47](http://github.com/asimov/asimov-core/commit/d3d77c47f2e704780714923ec30a81203181a115))
* **core:** deprecate get-component-map ([77e479de](http://github.com/asimov/asimov-core/commit/77e479def668a3ead6d86e9dd898820867b5080e))

<a name="v0.0.30"></a>
### v0.0.30 (2013-12-05)


#### Features

* **settings:** get should traverse settings not flatten them ([64f04903](http://github.com/asimov/asimov-core/commit/64f04903f2c1aa87c4ab55a99fc3dc9420738c80))

<a name="v0.0.29"></a>
### v0.0.29 (2013-12-03)


#### Bug Fixes

* **breakpoints:** passing a list or number into get-breakpoint should return early ([7ae143ca](http://github.com/asimov/asimov-core/commit/7ae143caec0d1135fa984b6ebab1e06f7da94fbd))
* **changelog:** use the correct changelog dep ([2bb2c6f9](http://github.com/asimov/asimov-core/commit/2bb2c6f99662559943be9fc64a1d050d8db41c68))
* **font-family:** fix documentation ([591c9200](http://github.com/asimov/asimov-core/commit/591c9200233565884c0dbee42965281ae85cab54))
* **font-size:** fix documentation ([16962984](http://github.com/asimov/asimov-core/commit/169629842693334eaddeb938bdd3634dbaa17f12))

<a name="v0.0.28"></a>
### v0.0.28 (2013-12-03)


#### Bug Fixes

* **changelog:** cannot generate changelog for first tag ([c9239111](http://github.com/asimov/asimov-core/commit/c92391113212d5e83216861d65676a2dd82ec94c))

<a name="v0.0.27"></a>
### v0.0.27 (2013-12-02)


#### Bug Fixes

* **build:** fix bug with sass load paths ([ece2ecb4](http://github.com/asimov/asimov-core/commit/ece2ecb4e4b896c5bd4ae96458867c8e3dc7c6f8))

<a name="v0.0.26"></a>
### v0.0.26 (2013-12-02)


#### Bug Fixes

* **build:** fix grunt bug with generating docs ([26f06682](http://github.com/asimov/asimov-core/commit/26f0668279644261f0d63f2f5e63c2b180b00393))

<a name="v0.0.25"></a>
### v0.0.25 (2013-12-02)

<a name="v0.0.24"></a>
### v0.0.24 (2013-12-02)


#### Features

* **sass:** add some common normalization styles ([d35501ed](http://github.com/asimov/asimov-core/commit/d35501ed5fc7b6df1379f20e797ea16539cb66cf))

<a name="v0.0.23"></a>
### v0.0.23 (2013-12-02)


#### Bug Fixes

* **settings:**
  * fix inconsistent cache invalidation ([0d310a62](https://github.com/asimov/asimov-core/commit/0d310a620a00860c5eb5b31d8b887d79c1c6e50e))
  * fix get-component-map not respecting cache status ([9e8fdaa3](https://github.com/asimov/asimov-core/commit/9e8fdaa31d04401eb73a82dfdf1ede2f55b24f4f))
  * default font size and line height set incorrectly ([1594fc49](https://github.com/asimov/asimov-core/commit/1594fc49287877c3b24ddec0dfd88f7255eda7f8))

<a name="v0.0.22"></a>
### v0.0.22 (2013-12-02)


#### Features

* **breakpoints:** add breakpoint support via compass-breakpoint ([0dc52f43](https://github.com/asimov/asimov-core/commit/0dc52f438c52b9dac4519df08906fe3dd2fa9abe))
* **core:** make export() available to components ([a76a6b7c](https://github.com/asimov/asimov-core/commit/a76a6b7cc7b230fe6b58bb9dd088033d0c28213c))
* **settings:**
  * namespace core settings under asimov ([098bae74](https://github.com/asimov/asimov-core/commit/098bae7466cdf538548c8415c84609ca88c710e1))
  * allow for setting multiple values at once ([245a366d](https://github.com/asimov/asimov-core/commit/245a366d9bff924eac36b736c9408d809562d739))
  * set some default brekpoints ([ff0b8d03](https://github.com/asimov/asimov-core/commit/ff0b8d03a00a8146c8888273c4aea0989ff21fc2))
  * set some defaults ([220b6a7c](https://github.com/asimov/asimov-core/commit/220b6a7c9b883c2abdb288448d7d5d2462c99b25))

<a name="v0.0.21"></a>
### v0.0.21 (2013-11-28)


#### Bug Fixes

* **changlog:** update broken changelog links ([b191702f](https://github.com/asimov/asimov-core/commit/b191702f7f242332929710b632d4d94bfbc01ec9))
* **release:** use package.json to find the github infor got changelog links ([f7b42992](https://github.com/asimov/asimov-core/commit/f7b42992644c34af056d928d27a20dcaf06976c0))

<a name="v0.0.20"></a>
### v0.0.20 (2013-11-28)


#### Bug Fixes

* **bower:** don't ignore .jshintrc ([91a3e5ca](http://github.com/asimov/asimov-core/commit/91a3e5ca5a90c6d4e703b3a83a726e93b7f662c9))


#### Features

* **build:** use a component's .jshintrc if it exists ([f306c31b](http://github.com/asimov/asimov-core/commit/f306c31b1385b491bc92f0a5839749c916cc7386))

<a name="v0.0.19"></a>
### v0.0.19 (2013-11-28)


#### Features

* **build:** add gslint to validate js code style ([f60baf04](http://github.com/asimov/asimov-core/commit/f60baf04aee808bc4c01a64ad2f09e2613be2446))

<a name="v0.0.18"></a>
### v0.0.18 (2013-11-27)


#### Bug Fixes

* **build:**
  * symlink error when compile docs for core ([3ebaf38a](http://github.com/asimov/asimov-core/commit/3ebaf38aa2182f5af27da09104f46d918ab1fa8f))
  * don't load minified dist assets in docs ([0efe5818](http://github.com/asimov/asimov-core/commit/0efe58189417f262a2be29dbd500b6b789b00b11))
  * always generate docs ([c2d7957a](http://github.com/asimov/asimov-core/commit/c2d7957a9f2b20dad9066bdc5bcc147ac877adce))


#### Features

* **build:**
  * concurrently run dev watcher and styleguide server ([9c3050a4](http://github.com/asimov/asimov-core/commit/9c3050a4d3782786a2d8c626d0ae32776c95c353))
  * add sane jshint defaults ([4a31831a](http://github.com/asimov/asimov-core/commit/4a31831a61cf913ce7a0788beebe9cc19191a680))
  * add jshint task ([00dcafec](http://github.com/asimov/asimov-core/commit/00dcafec0d6f5730129e99497db8076d802e2242))
  * add jsvalidate for basic js qa ([1f047faf](http://github.com/asimov/asimov-core/commit/1f047faf50387ccd377c614961e7c0f20c6ade8c))
  * remove generated files on fresh build ([9f3af24b](http://github.com/asimov/asimov-core/commit/9f3af24b7a5f307c15dfc738bc73e681276e4de9))
  * add js minification task ([68c2867e](http://github.com/asimov/asimov-core/commit/68c2867e3c3564e9a39cb632b46803195477acbf))
  * add css minification task ([5f545ffe](http://github.com/asimov/asimov-core/commit/5f545ffe9b69d6aef297010e42fd2b790725c814))

<a name="v0.0.17"></a>
### v0.0.17 (2013-11-26)

<a name="v0.0.16"></a>
### v0.0.16 (2013-11-26)


#### Bug Fixes

* **settings:** cache disabled by set-default but never re-enabled ([261e4565](http://github.com/asimov/asimov-core/commit/261e45658c717a363de8306bf4d9a7fe73edf52c))


#### Features

* **sass:** add some core sass APIs ([b4aa9469](http://github.com/asimov/asimov-core/commit/b4aa94697c5da3b4ec846eb007af62764b92a44f))

<a name="v0.0.15"></a>
### v0.0.15 (2013-11-25)


#### Bug Fixes

* **docs:**
  * be smarter about which files to auto inject into docs ([ec5eff95](http://github.com/asimov/asimov-core/commit/ec5eff95f2c78a111c3c44d5618170dde5152aae))
  * load core.js in docs by default ([879d813d](http://github.com/asimov/asimov-core/commit/879d813df382b773c5703f66abb8a57e13402436))


#### Features

* **build:** reduce amount of dist files generated by requirejs ([02f0743f](http://github.com/asimov/asimov-core/commit/02f0743fb14e7c216d7666f68640e9154e3cf096))

<a name="v0.0.14"></a>
### v0.0.14 (2013-11-25)


#### Bug Fixes

* **dist:** ignore requirejs' build.txt ([9877e89c](http://github.com/asimov/asimov-core/commit/9877e89c3e1c8e7e17345f6ef0a1ebc5dcbf9cd1))
* **docs:** add missing docs assets ([742721d4](http://github.com/asimov/asimov-core/commit/742721d465f00b3b2fc8924799e917730aae020c))


#### Features

* **build:** implement autoprefixer ([109d39f2](http://github.com/asimov/asimov-core/commit/109d39f2ca17dd9855b5e5680c8aefd9b79e91e7))
* **docs:** asset autoloading for component docs ([8698e3fe](http://github.com/asimov/asimov-core/commit/8698e3fe86691660a7828cf915942c03c297eef1))

<a name="v0.0.13"></a>
### v0.0.13 (2013-11-25)


#### Bug Fixes

* **js:** requirejs task should only copy js file to dist dir ([f02813ea](http://github.com/asimov/asimov-core/commit/f02813ea87ac89142dd6f31a25d4395bcffea486))

<a name="v0.0.12"></a>
### v0.0.12 (2013-11-25)


#### Features

* **js:** components can compile their js without local grunt tasks ([271b4bbc](http://github.com/asimov/asimov-core/commit/271b4bbcd1a64e806f55c8e29e709b25f0b1ce05))

<a name="v0.0.11"></a>
### v0.0.11 (2013-11-22)


#### Bug Fixes

* **sass:** dist files being generated in the wrong folder ([6149f006](http://github.com/asimov/asimov-core/commit/6149f006cda2c5d37bf412507be6be4cd4672fc3))


#### Features

* **styleguides:** basic support for styleguides ([ce872cf3](http://github.com/asimov/asimov-core/commit/ce872cf383606a0a6318f148ce1f27d5a61990f3))

<a name="v0.0.10"></a>
### v0.0.10 (2013-11-22)


#### Features

* **js:** add core.js for handle module config ([30065b7f](http://github.com/asimov/asimov-core/commit/30065b7fb0c4e0f2a728597ac0ac5e372acf0447))

<a name="v0.0.9"></a>
### v0.0.9 (2013-11-22)


#### Features

* **settings:** remove defaults ([002ff14d](http://github.com/asimov/asimov-core/commit/002ff14d3590bc86bb2f377e3b7b02db269e5b24))

<a name="v0.0.8"></a>
### v0.0.8 (2013-11-22)


#### Bug Fixes

* **release:** fix typo in release commit message ([8a6cb43e](http://github.com/asimov/asimov-core/commit/8a6cb43e4a3bd09818ea1d534f7d4e64d6e506e1))

<a name="v0.0.7"></a>
### v0.0.7 (2013-11-22)


#### Bug Fixes

* **release:** fix changelog using the wrong version string ([9190f06f](http://github.com/asimov/asimov-core/commit/9190f06fd73f713af87f4d2bbdb7c3de2136d8a0))


#### Features

* **settings:** implement a basic internal cache api ([cedb1539](http://github.com/asimov/asimov-core/commit/cedb1539483f156a56b920ba37ab1f470d48e9e9))

<a name="v0.0.6"></a>
### v0.0.6 (2013-11-22)


#### Bug Fixes

* **settings:** error when creating a new branch of settings ([ae9ee659](http://github.com/asimov/asimov-core/commit/ae9ee6592c65b5627b06c0ef51df4f62d0a1e3df))


#### Features

* **settings:**
  * set() and set-default() can now take a map of settings ([6cea7800](http://github.com/asimov/asimov-core/commit/6cea780093f19740f4d645d065be9d5f42103bbd))
  * add get(), set(), set-defaul() to the settings api ([0bb3eec5](http://github.com/asimov/asimov-core/commit/0bb3eec51d346fc185d07f98005f8b5bc4b3b0f1))

<a name="v0.0.5"></a>
### v0.0.5 (2013-11-21)


#### Features

* **settings:** create the get() entry point ([0aab7cb0](http://github.com/asimov/asimov-core/commit/0aab7cb081ddd318ad400b47f50dc0874cab032b))

<a name="v0.0.4"></a>
### v0.0.4 (2013-11-21)


#### Bug Fixes

* **build:** path munging so grunt will load npm modules ([10c14476](http://github.com/asimov/asimov-core/commit/10c144766697012d445f86fdfdb0f9a20f86164e))

<a name="v0.0.3"></a>
### v0.0.3 (2013-11-20)


#### Bug Fixes

* **tests:**
  * grunt should fail if sass tests fail ([f8c49ea9](http://github.com/asimov/asimov-core/commit/f8c49ea95f375078173d96ee22452c015b033f37))
  * sass tests not compiling ([17037d2b](http://github.com/asimov/asimov-core/commit/17037d2bf560f07480d16657ed8029038e0e48d7))

<a name="v0.0.2"></a>
### v0.0.2 (2013-11-20)


#### Bug Fixes

* **git:** fix validate commit msg git hook permissions ([c5fd2907](http://github.com/asimov/asimov-core/commit/c5fd290726358b9f6fbbcdff43c2a89371bb3674))


#### Features

* **release:**
  * commit the changelog on release ([c94dc5a2](http://github.com/asimov/asimov-core/commit/c94dc5a26a3e636a8644cfe663a1653b74668605))
  * combine automatic releasing and changelog generation ([4afee70a](http://github.com/asimov/asimov-core/commit/4afee70a6e8e8210a97cf20fc8dc896ffe813b94))

