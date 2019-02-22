# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-02-22 14:32
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(blank=True, max_length=1000, null=True)),
                ('image', models.ImageField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(blank=True, max_length=1000, null=True)),
                ('boxes', models.TextField(blank=True, max_length=1000000, null=True)),
                ('image_detail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.Image')),
            ],
        ),
    ]
