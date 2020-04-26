#!/usr/bin/env python3

from setuptools import setup, find_packages

# Get the long description from the README file
with open('README.md', encoding='utf-8') as f:
    long_description = f.read()

setup(
    name='emily',
    version='0.1',
    description='Emily Application',
    long_description=long_description,
    url='https://',
    author='Samy Jaimes',
    author_email='samy_jaimes@hotmail.com',
    packages=find_packages(),
    classifiers=[
        'Framework :: Flask',
        'Programming Language :: Python :: 3.6',
    ],
    keywords=[
        'REST',
        'flask'
    ],
    python_requires='>=3.6',
    install_requires=[
        'werkzeug>=1.0.1',
        'Flask>=1.1.2',
        'Flask-RESTful>=0.3.8'
    ],
)
