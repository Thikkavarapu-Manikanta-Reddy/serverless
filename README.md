# Cloud Function Deployment with Terraform

This repository contains the source code  for deploying a Google Cloud Function that sends verification emails to users. The Cloud Function is triggered by messages published to a Pub/Sub topic.

## Functionality

- Listens for messages published to a Pub/Sub topic.
- Sends a verification email to users containing a link to verify their email address.
- Logs the email sent in a MySQL database.

## Prerequisites

Before deploying the Cloud Function, make sure you have the following:

1. Google Cloud Platform account with billing enabled.
2. Google Cloud SDK installed locally.
3. MySQL database instance set up for logging email sent records.
4. Mailgun account for sending emails.

## Deployment Steps

1. **Set up Environment Variables**: Set the necessary environment variables required for the Cloud Function and Terraform deployment. These include:
   - `MAILGUN_API_KEY`: API key for Mailgun service.
   - `MAIL_GUN_DOMAIN_NAME`: Domain associated with your Mailgun account.
   - `hostname`: Hostname for your MySQL database.
   - `username`: Username for accessing your MySQL database.
   - `password`: Password for accessing your MySQL database.

2. **Deploy Cloud Function with Terraform**:
   - Clone this repository to your local machine at correct file path.
   - Navigate to the `terraform` directory.
   - Run `terraform init` to initialize the Terraform configuration.
   - Run `terraform plan` to plan the Cloud resources allocation.
   - Run `terraform apply` to deploy the Cloud Function and related resources.

3. **Verify Deployment**:
   - After deployment, confirm that the Cloud Function is successfully deployed in your Google Cloud Platform project.
   - Test the functionality by publishing a message to the `verify_email` Pub/Sub topic.

## Additional Information

- Make sure to review and customize the Terraform configuration files (`main.tf`, `variables.tf`, etc.) according to your specific requirements like file path, etc.
