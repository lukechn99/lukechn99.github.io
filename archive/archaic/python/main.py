import scrapy
from random import randint
from flask import Flask

## main should include parsing
## matching to 
## use scrapy

import numpy as np # linear algebra
import pandas as pd # pandas for dataframe based data processing and CSV file I/O
import requests # for http requests
from bs4 import BeautifulSoup # for html parsing and scraping
import bs4
from fastnumbers import isfloat 
from fastnumbers import fast_float
from multiprocessing.dummy import Pool as ThreadPool 

import matplotlib.pyplot as plt
import seaborn as sns
import json
from tidylib import tidy_document # for tidying incorrect html

sns.set_style('whitegrid')
#%matplotlib inline
from IPython.core.interactiveshell import InteractiveShell
InteractiveShell.ast_node_interactivity = "all"

def ffloat(string):
    if string is None:
        return np.nan
    if type(string)==float or type(string)==np.float64:
        return string
    if type(string)==int or type(string)==np.int64:
        return string
    return fast_float(string.split(" ")[0].replace(',','').replace('%',''),
                      default=np.nan)
    
url = "https://jsonplaceholder.typicode.com/posts/1"
response = requests.get(url, timeout=240)
response.status_code
response.json()

content = page_response.json()
content.keys()
## PATTERNS
## Pennant
#
#
## Cup and Handle
#
#
## Ascending Triangle
#
#
## Triple Bottom
#
#
## Descending Triangle
#
#
## Inverse head and shoulders
#
#
## Bullish Symmetric Triangle
#
#
## 
