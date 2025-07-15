import {
  data_engineer,
  software_engineer,
  etl_developer,
  cloud_solutions_architect,
  docker,
  innateAI,
  listeds,
  music,
  maas,
  fraud,
  python,
  sql,
  apacheSpark,
  apacheKafka,
  apacheAirflow,
  awsGlue,
  terraform,
  postgresql,
  awsRedshift,
  greatExpectations,
  dbt,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Experience",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Data Engineer",
    icon: data_engineer,
  },
  {
    title: "Software Engineer",
    icon: software_engineer,
  },
  {
    title: "ETL Developer",
    icon: etl_developer,
  },
  {
    title: "Cloud Solutions Architect",
    icon: cloud_solutions_architect,
  },
];

const technologies = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "SQL",
    icon: sql,
  },
  {
    name: "Apache Spark",
    icon: apacheSpark,
  },
  {
    name: "Apache Kafka",
    icon: apacheKafka,
  },
  {
    name: "Apache Airflow",
    icon: apacheAirflow,
  },
  {
    name: "AWS Glue",
    icon: awsGlue,
  },
  {
    name: "Terraform",
    icon: terraform,
  },
  {
    name: "PostgreSQL",
    icon: postgresql,
  },
  {
    name: "AWS Redshift",
    icon: awsRedshift,
  },
  {
    name: "Great Expectations",
    icon: greatExpectations,
  },
  {
    name: "dbt",
    icon: dbt,
  },
  {
    name: "Docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Data Engineering Intern",
    company_name: "Listeds (Brainbites)",
    icon: listeds,
    iconBg: "linear-gradient(135deg, #001F3F 0%, #4A90E2 100%)",
    date: "April 2025 - July 2025",
    points: [
      "Built the data foundation platform for data-driven decision making at a fast-growing Finnish startup using medallion architecture",
      "Designed GCP-based data platform with Infrastructure as Code, enabling real-time analytics for board and management reporting",
      "Developed ETL pipelines with incremental loading and automated validation, reducing manual data processing by 80%",
      "Implemented comprehensive data quality frameworks and monitoring systems that catch data issues before impacting business reporting",
    ],
  },
  {
    title: "Data Engineering Intern",
    company_name: "Innate AI (Pharmaceutical AI)",
    icon: innateAI,
    iconBg: "linear-gradient(135deg, #4A90E2 0%, #228B22 50%, #32CD32 100%)",
    date: "November 2024 - February 2025",
    points: [
      "Built AWS-based data platform processing 5M+ clinical records with 99.9% accuracy using S3, Glue, and Redshift in medallion architecture",
      "Developed ETL pipelines with Apache Airflow for real-time ML model training, reducing data preparation time from days to hours",
      "Created Python validation frameworks, achieving 95% reduction in data quality issues across all healthcare datasets",
      "Expanded ML training data by 30% through automated integration of external healthcare APIs while maintaining strict HIPAA compliance",
    ],
  },
  {
    title: "Software Engineer (Back-end)",
    company_name: "BlueWave Data Solutions",
    icon: null, // No logo - keeping empty as requested
    iconBg: "linear-gradient(135deg, #383E56 0%, #5A67D8 100%)",
    date: "April 2024 - December 2024",
    points: [
      "Developed Python-based REST APIs for data integrations with enterprise clients",
      "Managed PostgreSQL databases with complex SQL schema design and optimization for high-performance queries",
      "Built scalable server architecture integrating AWS S3 and Google Cloud services for multi-cloud data solutions",
      "Implemented version control workflows with Git, ensuring code quality and team collaboration standards",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "Lomado Oy",
    icon: null, // No logo - keeping empty as requested
    iconBg: "linear-gradient(135deg, #E6DEDD 0%, #9F7AEA 100%)",
    date: "February 2024 - April 2024",
    points: [
      "Built REST APIs for client data management systems supporting multiple business applications",
      "Developed automated data processing pipelines using Python and PostgreSQL for real-time analytics",
      "Created interactive business intelligence dashboard enabling stakeholders to make data-driven decisions",
      "Implemented microservices architecture and ETL processes for seamless integration of various client data systems",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "",
    name: "Dr. Sarah Chen",
    designation: "Lead Data Scientist",
    company: "PharmaAI Labs",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "",
    name: "Michael Rodriguez",
    designation: "CTO",
    company: "DataFlow Solutions",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "",
    name: "Lisa Wang",
    designation: "Engineering Manager",
    company: "CloudTech Innovations",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "DeFtunes Data Pipeline",
    description:
      "Architected and implemented an end-to-end data pipeline for music streaming analytics using medallion architecture. Features daily incremental loads with Apache Airflow, data quality checks with dbt, and analytical views using Redshift for optimized data models and visualization dashboards.",
    tags: [
      {
        name: "aws-glue",
        color: "blue-text-gradient",
      },
      {
        name: "apache-airflow",
        color: "green-text-gradient",
      },
      {
        name: "redshift",
        color: "pink-text-gradient",
      },
      {
        name: "terraform",
        color: "blue-text-gradient",
      },
      {
        name: "dbt",
        color: "green-text-gradient",
      },
      {
        name: "apache-iceberg",
        color: "pink-text-gradient",
      },
    ],
    image: music,
    source_code_link: "https://github.com/DuyDoan190203/Deftunes-music-data-platform",
  },
  {
    name: "ML-Driven Mobility Service Pipeline",
    description:
      "Developed an end-to-end data pipeline supporting ML models for ride duration prediction across three mobility service vendors. Features automated data ingestion, preprocessing workflows, and real-time streaming processing with comprehensive monitoring dashboards.",
    tags: [
      {
        name: "apache-airflow",
        color: "blue-text-gradient",
      },
      {
        name: "aws-kinesis",
        color: "green-text-gradient",
      },
      {
        name: "great-expectations",
        color: "pink-text-gradient",
      },
      {
        name: "terraform",
        color: "blue-text-gradient",
      },
      {
        name: "machine-learning",
        color: "green-text-gradient",
      },
    ],
    image: maas,
    source_code_link: "https://github.com/DuyDoan190203",
  },
  {
    name: "Fraud Detection Pipeline and Platform",
    description:
      "Built a real-time fraud detection system processing 1000+ transactions per minute using Kafka and machine learning. Features streaming data pipelines, Grafana monitoring dashboards, and integrated data quality checks with Great Expectations for transaction validation.",
    tags: [
      {
        name: "kafka",
        color: "blue-text-gradient",
      },
      {
        name: "python",
        color: "green-text-gradient",
      },
      {
        name: "grafana",
        color: "pink-text-gradient",
      },
      {
        name: "machine-learning",
        color: "blue-text-gradient",
      },
      {
        name: "great-expectations",
        color: "green-text-gradient",
      },
    ],
    image: fraud,
    source_code_link: "https://github.com/DuyDoan190203",
  },
];

export { services, technologies, experiences, testimonials, projects };
