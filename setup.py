#!/usr/bin/env python3

from setuptools import setup, find_packages

# Get the long description from the README file
with open('README.md', encoding='utf-8') as f:
    long_description = f.read()

setup(
    name='emily',
    version='0.1',
    description='Build a REST API with Flask',
    long_description=long_description,
    url='',
    author='',
    author_email='',
    license='',
    classifiers=[
        'Framework :: Flask',
        'Programming Language :: Python :: 3.6',
    ],
    keywords=[
        'REST',
        'flask'
    ],
    packages=find_packages(exclude=['tests*']),
    include_package_data=False,
    package_data={},
    python_requires='>=3.6',
    install_requires=[
        'werkzeug>=1.0.1',
        'Flask>=1.1.2',
        'Flask-RESTful>=0.3.8'
    ],
)
