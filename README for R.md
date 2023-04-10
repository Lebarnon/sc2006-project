# HDB Resale Price Prediction

This project aims to predict the resale prices of HDB flats in Singapore using a linear regression model. The dataset used contains information on HDB resale transactions from January 2017 onwards that is downloaded from the data.gov live API.

## Dependencies

caret
jsonlite

## How to run 

1. Ensure that you have R installed on your system.
2. Install the required libraries by running the following commands in R: install.packages(caret), install.packages(jsonlite)
3. Download the dataset resale-flat-prices-based-on-registration-date-from-jan-2017-onwards.csv and place it in the same directory as the R script.
4. Run the R Script, which will perform the following:
5. Load the dataset
6. Preprocess the data(Convert remaining lease to years, one-hot encode categorical variables)
7. Train the linear regression model
8. Clean up variable names
9. Extract and save significant variables
After running the script, the output files are uploaded to our database, firebase for the coefficients to be used when computing the “Estimated Price” on our website


