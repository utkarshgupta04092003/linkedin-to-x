export const countries = [
    "",
    "Spain",
    "France",
    "Germany",
    "Deutschland",
    "Belgium",
    "Italy",
    "United kingdom",
    "Scotland",
    "Ireland",

    "China",
    "India",
    "Japan",

    "United States",
    "Canada",

    "Denmark",
    "Norway",
    "Sweden",
    "Finland",

    "Russia",
    "Estonia",
    "Grece",
    "Romania",
    "Switzerland",
]
export const technologies = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "Angular",
    "Vue",
    "Next.js",
    "Backend",
    "Frontend",
    "Full Stack",
    "DevOps",
    "Machine Learning",
    "Artificial Intelligence",
    "Blockchain",
    "Cybersecurity",
    "Cloud Computing",
    "Nest.js",

    "Django",
    "Svelte",
    "Solidity",
    "Data Science",
    "Systems Engineer",
    "C++",
    "Laravel",
    "Ruby on Rails",
    "WordPress",
    "Ionic",
    "Quantum Computing",
    "IoT",
    "RPA",
    "AR/VR",
    "Edge Computing",
    "5G Technology",
    "Stencil",
]

export const searchParamsList: { searchText: string; locationText: string }[] = countries
    .map((location) => {
        return technologies.map((tech) => ({
            searchText: tech,
            locationText: location,
        }))
    })
    .flat()

export const stacks = [
    "angularjs",
    "kubernetes",
    "javascript",
    "jenkins",
    "html",
    "angular-material-7",
    "angular-material2",
    "angular-material-5",
    "angular",
    "css",
    "via",
    "typescript2.0",
    "angular8",
    "java",
    "spring",
    "hibernate",
    "typescript",
    "go",
    "amazon-web-services",
    "mongodb",
    "node.js",
    "saas",
    "jwt",
    "rxjs",
    "c#",
    "android",
    "ios",
    "reactjs",
    "continuous-integration",
    "ionic-framework",
    "webpack",
    "highcharts",
    "express",
    "react-native",
    "azure",
    "scrum",
    ".net-core",
    "architecture",
    "rest",
    "asp.net-core-webapi",
    "ngrx",
    "devops",
    "angular-material",
    "docker",
    "graphql",
    "php",
    "restful",
    "python",
    "npm",
    "user-interface",
    "user-experience",
    "frontend",
    "asp.net-core",
    "asp.net-mvc",
    "mysql",
    ".net",
    "redis",
    "linux",
    "wpf",
    "xamarin",
    "ruby-on-rails",
    "sql",
    "postgresql",
    "git",
    "project-management",
    "neoscms",
    "typo3",
    "tomcat",
    "mockito",
    "swift",
    "restapi",
    "cybersecurity",
    "core",
    "vue.js",
    "asp.net",
    "angular-ui-bootstrap",
    "electron",
    "graph",
    "spring-boot",
    "elixir",
    "phoenix",
    "django",
    "spring-boot-2",
    "kotlin",
    "terraform",
    "flask",
    "apache",
    "aurelia",
    "ecmascript-6",
    "ruby",
    "swift4",
    "oracle",
    "soa",
    "java-ee-6",
    "sass",
    "html5",
    "react",
    "css3",
    "jquery",
    "microservices",
    "webrtc",
    "swagger",
    "sql-server",
    "winforms",
    "node",
    "single-page-application",
    "progressive-web-apps",
    "websocket",
    "logo-lang",
    "tailwind-css",
    "tdd",
    "security",
    "cloud",
    "sapui5",
    "odata",
    "frameworks",
    "mobile",
    "nestjs",
    "google-cloud-platform",
    "nosql",
    "bootstrap-4",
    "wordpress",
    "design-patterns",
    "vue",
    "aws",
    "github",
    "startup",
    "java-ee",
    "jira",
    "intellij-idea",
    "agile",
    "c#.net",
    "web-services",
    "linq",
    "c",
    "azure-sql-database",
    "cordova",
    "maven",
    "jakarta-ee",
    "aws-iot",
    "junit",
    "data",
    "jpa",
    "database",
    "event-driven",
    "apache-kafka",
    "elasticsearch",
    "json",
    "automation",
    "aws-eks",
    "ansible",
    "open-source",
    "rest-assured",
    "protractor",
    "golang",
    "symfony4",
    "design",
    "unit-testing",
    "mobx",
    "vue-component",
    "vuex",
    "vuetify.js",
    "jestjs",
    "oop",
    "redux",
    "web",
    "postman",
    "cypress",
    "spartacus-storefront",
    "testing",
    "robotframework",
    "gitlab",
    "backend",
    "ember.js",
    "shell",
    "c++builder",
    "c++",
    "iot",
    "r",
    "laravel",
    "selenium",
    "cucumber",
    "api-design",
    "windows",
    "webgl",
    "azure-devops",
    "word",
    "continuous-delivery",
    "qa",
    "specflow",
    "drupal8",
    "styled-components",
    "playframework",
    "react-redux",
    "d3.js",
    "perl",
    "sailpoint",
    "blockchain",
    "contentful",
    "apollo",
    "python-3.x",
    "redux-saga",
    "react-hooks",
    "mobile-development",
    "sdk",
    "http",
    "next.js",
    "symfony",
    "react-state-management",
    "symfony2",
    "google-cloud",
    "platform",
    "high-traffic",
    "bigdata",
    "react-fullstack",
    "web-applications",
    "relayjs",
    "hugo",
    "network-security",
    "bash",
    "database-management",
    "sysadmin",
    "jboss",
    "wildfly",
    "jdbc",
    "data-warehouse",
    "etl",
    "jvm",
    "react-query",
    "haskell",
    "purescript",
    "apache-kafka-streams",
    "machine-learning",
    "artificial-intelligence",
    "material-ui",
    "react-final-form",
    "node-js",
    "api",
    "crypto",
    "extjs",
    "reactnative",
    "next",
    "ssr",
    "three.js",
    "unreal-engine4",
    "opengl",
    "seo",
    "functional-programming",
    "solidity",
    "hazelcast",
    "grafana",
    "kibana",
    "clojure",
    "clojurescript",
    "re-frame",
    "apache-spark",
    "couchdb",
    "rust",
    "amazon-redshift",
    "grpc",
    "grpc-go",
    "responsive-design",
    "prose-mirror",
    "real-time",
    "vagrant",
    "graphene-python",
    "prometheus",
    "ui",
    "ux",
    "nodejs",
    "micro-frontend",
    "content-management-system",
    "drupal",
    "entity-framework",
    "distributed-system",
    "intellij-13",
    "scala",
    "flutter",
    "java-11",
    "headless-cms",
    "genesys",
    "genesys-platform-sdk",
    "postgres",
    "google-app-engine",
    "mlops",
    "mern",
    "figma",
    "groovy",
    "google-maps",
    "data-visualization",
    "boost",
    "audio",
    "invision",
    "appium",
    "circleci",
    "gradle",
    "gatsby",
    "jsp",
    "react.js",
    "deployment",
    "communication",
    "jasmine",
    "matlab",
    "solid-principles",
    "server-side-rendering",
    "serverless",
    "tensorflow",
    "svelte",
    "grails",
    "lumen",
    "vert.x",
    "continuous-deployment",
    "objective-c",
    "hardware-interface",
    "c#-4.0",
    "apex",
    "salesforce",
    "lucene",
    "aws-cdk",
    "lambda",
    "amazon-s3",
    "amazon-rds",
    "spring-mvc",
    "gcp",
    "boot",
    "automated-tests",
    "less",
    "parceljs",
    "mqtt",
    "sws",
    "product",
    "mercurial",
    "phpunit",
    "css-preprocessor",
    "firebase",
    "google-cloud-functions",
    "bdd",
    "akka",
    "scala-cats",
    "java-8",
    "protocol-buffers",
    "vuejs",
    "babeljs",
    "serverless-framework",
    "parse-platform",
    "dry",
    "solid",
    "thymeleaf",
    "sentry",
    "slim",
    "azure-functions",
    "aws-api-gateway",
    "amazon-dynamodb",
    "rabbitmq",
    "model-view-controller",
    "gpt",
    "aws-lambda",
    "excel",
    "c++11",
    "macos",
    "stream-processing",
    "lamp",
    "jenkins-pipeline",
    "webdriver",
    "nunit",
    "chromium",
    "statistics",
    "mariadb",
    "web-animations",
    "dom",
    "xaml",
    "lua",
    "reverse-engineering",
    "neural-network",
    "prediction",
    "openstack",
    "android-studio",
    "golang-migrate",
    "asp.net-web-api",
    "xamarin.forms",
    "data-pipeline",
    "woocommerce",
    "sidekiq",
    "postcss",
    "pyramid",
    "restify",
    "erlang",
    "3d",
    "rendering",
    "salesforce-commerce-cloud",
    "payment",
    "reliability",
    "salesforce-communities",
    "cassandra",
    "pytorch",
    "containers",
    "ethereum",
    "cryptocurrency",
    "rdbms",
    "shopify",
    "shopware",
    "multithreading",
    "network-programming",
    "networking",
    "cryptography",
    "p2p",
    "lead",
    "mvvm",
    "behat",
    "vb.net",
    "rpa",
    "uml",
    "qt",
    "web-development-server",
    "php-7",
    "magento",
    "magento2",
    "express.js",
    "sre",
    "powershell",
    "product-management",
    "owasp",
    "openid-connect",
    "penetration-testing",
    "oauth-2.0",
    "applitools",
    "galen",
    "puppet",
    "qml",
    "dart",
    "swiftui",
    "uikit",
    "appium-android",
    "appium-ios",
    "hana",
    "abap",
    "maps",
    "gis",
    "lorawan",
    "node-red",
    "data-science",
    "doctrine",
    "cloudformation",
    "dynamics-crm",
    "dynamics-crm-365",
    "power-automate",
    "nginx",
    "ms-access",
    "hmtl",
    "rest-api",
    "cdn",
    "newrelic",
    "mssql",
    "crm",
    "back-end",
    "salt-stack",
    "infrastructure-as-code",
    "sphinx",
    "google-apps-script",
    "google-gsuite",
    "liquid",
    "sap",
    "end-to-end",
    "wicket",
    "shadow-dom",
    "elm",
    "pixi.js",
    "domain-driven-design",
    "cdk",
    "html5-canvas",
    "codeceptjs",
    "performance-testing",
    "web-api-testing",
    "unix",
    "authentication",
    "oauth",
    "fastapi",
    "pyspark",
    "hadoop",
    "algorithm",
    "geospatial",
    "postgis",
    "elk",
    "dvc",
    "command-line-interface",
    "pandas",
    "hl7-fhir",
    "scipy",
    "kafka",
    "airflow",
    "numpy",
    "conda",
    "scikit-learn",
    "infrastructure",
    "walrus-operator",
    "qgraphicsview",
    "pyqtgraph",
    "python-asyncio",
    "jupyter-notebook",
    "lte",
    "computer-vision",
    "sqlalchemy",
    "c++14",
    "apache-flink",
    "luigi",
    "database-administration",
    "embedded",
    "embedded-linux",
    "ubuntu",
    "banking",
    "scripting",
    "message-queue",
    "google-bigquery",
    "julia",
    "paas",
    "dbt",
    "video",
    "distributed-computing",
    "amazon-cloudformation",
    "perforce",
    "keras",
    "gitlab-ci",
    "apache-airflow",
    "relational-database",
    "informatica",
    "computer-architecture",
    "deep-learning",
    "dask",
    "cluster-computing",
    "ceph",
    "cephfs",
    "cmake",
    "bioinformatics",
    "netbeans",
    "data-analysis",
    "rspec",
    "kanban",
    "linux-kernel",
    "event-driven-design",
    "rpm",
    "architect",
    "cpu",
    "cpu-architecture",
    "gpu",
    "lxc",
    "fortran",
    "tsql",
    "network-protocols",
    "can-bus",
    "battery",
    "elastic-stack",
    "stochastic-process",
    "graph-theory",
    "qnx",
    "hdfs",
    "configuration",
    "data-modeling",
    "netweaver",
    "apache-pulsar",
    "google-anthos",
    "qlikview",
    "server",
    "metabase",
    "redash",
    "business-intelligence",
    "web-scraping",
    "data-mining",
    "debugging",
    "cross-platform",
    "xml",
    "xslt-2.0",
    "databricks",
    "kvm",
    "gnu",
    "tcp-ip",
    "hive",
    "feature-engineering",
    "big-data",
    "centos",
    "redshift",
    "slam",
    "visual-odometry",
    "kubernetes-helm",
    "nlp",
    "forecasting",
    "amazon-athena",
    "c++17",
    "simulink",
    "freertos",
    "infrastructure-as-a-code",
    "unity3d",
    "android-espresso",
    "opencv",
    "datadog",
    "spark-streaming",
    "system-administration",
    "google-kubernetes-engine",
    "kubernetes-ingress",
    "looker",
    "chef-infra",
    "pytest",
    "powerbi",
    "confluence",
    "malware-detection",
    "low-latency",
    "osx",
    "yocto",
    "debian",
    "yaml",
    "tableau-api",
    "video-streaming",
    "clickhouse",
    "abas",
    "nextflow",
    "shiny",
    "sparql",
    "system",
    "c-sharp",
    "windows-applications",
    "cocoa",
    "method-swizzling",
    "arinc",
    "systems-programming",
    "altium-designer",
    "blazor",
    "opc",
    "ethernet",
    "posix",
    "verilog",
    "scada",
    "industrial",
    "htl",
    "ata",
    "mvc",
    "data-structures",
    "rx-java",
    "concurrency",
    "solr",
    "oo-design",
    "orm",
    "jailbreak",
    "vpn",
    "socket",
    "augmented-reality",
    "trading",
    "forex",
    "plsql",
    "appkit",
    "core-data",
    "software-design",
    "server-administration",
    "itil",
    "physics",
    "quantmod",
    "custom-error-handling",
    "unity",
    "vb",
    "optimization",
    "graphics",
    "functional",
    "couchbase",
    "azure-cosmosdb",
    "moltenvk",
    "vulkan",
    "sling",
    "osgi",
    "aem",
    "webapi",
    "mumps",
    "amazon-kinesis",
    "data-distribution-service",
    "android-source",
    "desktop-application",
    "use-case",
    "bpmn",
    "cobra",
    "requirements-management",
    "tfs",
    "enterprise-architect",
    "sbt",
    "swift5",
    "integration-testing",
    "aws-codebuild",
    "dhcp",
    "dns",
    "cd",
    "supervisord",
    "fabric",
    "gdprconsentform",
    "audit",
    "sox",
    "android-camera",
    "xcuitest",
    "e-commerce",
    "heroku",
    "elixir-iex",
    "sinatra",
    "caching",
    "solidus",
    "xcode",
    "rust-tokio",
    "phoenix-framework",
    "webxr",
    "html5-video",
    "babylonjs",
    "rtmp",
    "laravel-5.7",
    "laravel-5.8",
    "visual-studio-code",
    "jsf",
    "usability",
    "primefaces",
    "flux",
    "iphone",
    "bitrise",
    "fastlane",
    "ios-autolayout",
    "profiling",
    "view-debugging",
    "android-jetpack",
    "kotlin-coroutines",
    "teamcity",
    "android-viewbinding",
    "exoplayer",
    "design-system",
    "material-design",
    "watchkit",
    "rx-kotlin",
    "xib",
    "cocoa-touch",
    "refactoring",
    "sustainable-pace",
    "s4hana",
    "sapr3",
    "openshift",
    "hubspot",
    "akka-stream",
    "sketchapp",
    "hybris",
    "project-reactor",
    "combine",
    "erp",
    "soap",
    "java-ee-8",
    "recommendation-engine",
    "ab-testing",
    "typeorm",
    "sap-fiori",
    "wear-os",
    "neo4j",
    "aws-elemental",
    "serverless-architecture",
    "laminas",
    "kafka-consumer-api",
    "docker-swarm",
    "cobol",
    "clang",
    "laravel-nova",
    "codeigniter",
    "zio",
    "cats-effect",
    "f#",
    "sip",
    "tls1.2",
    "interface",
    "testng",
    "xsd",
    "bison",
    "tokenize",
    "eclipse",
    "stl",
    "single-sign-on",
    "mocha.js",
    "chai",
    "analytics",
    "gherkin",
    "integration",
    "apache-beam",
    "spotify-scio",
    "vmware",
    "switching",
    "coreml",
    "analysis",
    "gwt",
    "tooling",
    "observability",
    "tcpip",
    "lan",
    "wan",
    "iaas",
    "vlan",
    "voip",
    "red",
    "redhat",
    "hpc",
    "slurm",
    "admin",
    "controlling",
    "computer-science",
    "hyper-v",
    "windows-client",
    "solaris",
    "exadata",
    "proxysql",
    "database-design",
    "query-optimization",
    "impala",
    "flink",
    "active-directory",
    "exchange-server",
    "pulumi",
    "telecommunication",
    "penetration-tools",
    "honeypot",
    "verification",
    "kpi",
    "system-testing",
    "manual-testing",
    "arm",
    "electronics",
    "zynq",
    "fpga",
    "x-ray",
    "dynamics-365",
    "dynamics-ax-2012",
    "microsoft-dynamics",
    "nav",
    "archive",
    "ip",
    "io",
    "page-caching",
    "enterprise",
    "ptc-windchill",
    "thingworx",
    "ms-office",
    "google-workspace",
    "jooq",
    "amazon-sagemaker",
    "gin-gonic",
    "llvm",
    "compiler-construction",
    "sketch",
    "military",
    "office365",
    "aps",
    "discrete-optimization",
    "ada",
    "cosmos",
    "azure-active-directory",
    "cad",
    "teamleader",
    "photogrammetry",
    "image-processing",
    "distributed",
    "mapreduce",
    "scale",
    "argocd",
    "liferay",
    "product-development",
    "rxjava",
    "dagger2",
    "sqlite",
    "sap-commerce-cloud",
    "spark",
    "package",
    "module",
    "quarkus",
    "keycloak",
    "ssas",
    "ssis",
    "bigtable",
    "jruby",
    "oxid",
    "math",
    "performance",
    "api-gateway",
    "hashicorp",
    "pentaho",
    "bamboo",
    "puppet-enterprise",
    "buildmaster",
    "visual-studio",
    "prototype",
    "karate",
    "software-quality",
    "silktest",
    "prototyping",
    "mixpanel",
    "ssrs",
    "cloud-platform",
    "agile-project-management",
    "migration",
    "documentation",
    "ads",
    "advertisement-server",
    "ssp",
    "build",
    "memcached",
    "spring-kafka",
    "self-contained",
    "virtualization",
    "visualization",
    "cisco",
    "storage",
    "san",
    "ibm-integration-bus",
    "rpg",
    "azure-logic-apps",
    "cds",
]
