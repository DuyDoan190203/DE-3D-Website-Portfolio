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
      "Built the data foundation platform for data-driven decision making at a fast-growing Finnish startup",
      "Designed medallion architecture GCP platform with IaC for real-time analytics in reporting",
      "Developed ETL pipelines with incremental loading and validation, reducing manual processing by 80%",
      "Collaborated on web scraping integration to cloud storage for seamless data flows",
      "Implemented data quality monitoring to prevent issues in business reporting",
    ],
  },
  {
    title: "Data Engineering Intern",
    company_name: "Innate AI (Pharmaceutical AI)",
    icon: innateAI,
    iconBg: "linear-gradient(135deg, #4A90E2 0%, #228B22 50%, #32CD32 100%)",
    date: "November 2024 - February 2025",
    points: [
      "Built the foundation and architected cloud data infrastructure for pharmaceutical AI applications in Helsinki's growing healthtech scene",
      "Built AWS platform processing 5M+ records at 99.9% accuracy using S3, Glue, and Redshift",
      "Developed Airflow ETL pipelines for ML training, cutting prep time from days to hours",
      "Created Python validation frameworks, reducing data quality issues by 95%",
      "Expanded ML data by 30% via API integration with HIPAA compliance",
    ],
  },
  {
    title: "Software Engineer (Back-end)",
    company_name: "BlueWave Data Solutions",
    icon: null, // No logo - keeping empty as requested
    iconBg: "linear-gradient(135deg, #383E56 0%, #5A67D8 100%)",
    date: "April 2024 - December 2024",
    points: [
      "Developed Python-based REST APIs for data integrations",
      "Managed PostgreSQL databases with SQL for schema design and queries, integrating with AWS S3 and Google Cloud",
      "Built scalable server logic with Git for version control",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "Lomado Oy",
    icon: null, // No logo - keeping empty as requested
    iconBg: "linear-gradient(135deg, #E6DEDD 0%, #9F7AEA 100%)",
    date: "February 2024 - April 2024",
    points: [
      "Built REST APIs for client data management systems",
      "Developed automated data processing pipelines using Python and PostgreSQL",
      "Created real-time analytics dashboard for business intelligence reporting",
      "Implemented microservices architecture supporting multiple client applications",
      "Built ETL processes for integrating data from various client systems",
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
      "Data pipeline for fleet operations with automated quality validation",
    tags: [
      {
        name: "apache-airflow",
        color: "blue-text-gradient",
      },
      {
        name: "great-expectations",
        color: "pink-text-gradient",
      },
      {
        name: "machine-learning",
        color: "green-text-gradient",
      },
    ],
    image: maas,
    source_code_link: "https://github.com/DuyDoan190203/Fleet-Management-Pipeline-with-Data-Quality/tree/master",
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
