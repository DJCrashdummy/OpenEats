# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-01-27 09:05
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0005_recipe_source'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='direction',
            options={'ordering': ['step']},
        ),
    ]