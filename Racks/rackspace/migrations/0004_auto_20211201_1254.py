# Generated by Django 3.2.9 on 2021-12-01 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rackspace', '0003_networkcard_ip_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jbod',
            name='public',
        ),
        migrations.AddField(
            model_name='jbod',
            name='public',
            field=models.CharField(choices=[('PR', 'Private'), ('RO', 'Read-Only'), ('PB', 'Public')], default='PR', max_length=2),
        ),
        migrations.RemoveField(
            model_name='network',
            name='public',
        ),
        migrations.AddField(
            model_name='network',
            name='public',
            field=models.CharField(choices=[('PR', 'Private'), ('RO', 'Read-Only'), ('PB', 'Public')], default='PR', max_length=2),
        ),
        migrations.RemoveField(
            model_name='patchpanel',
            name='public',
        ),
        migrations.AddField(
            model_name='patchpanel',
            name='public',
            field=models.CharField(choices=[('PR', 'Private'), ('RO', 'Read-Only'), ('PB', 'Public')], default='PR', max_length=2),
        ),
        migrations.RemoveField(
            model_name='rack',
            name='public',
        ),
        migrations.AddField(
            model_name='rack',
            name='public',
            field=models.CharField(choices=[('PR', 'Private'), ('RO', 'Read-Only'), ('PB', 'Public')], default='PR', max_length=2),
        ),
        migrations.RemoveField(
            model_name='server',
            name='public',
        ),
        migrations.AddField(
            model_name='server',
            name='public',
            field=models.CharField(choices=[('PR', 'Private'), ('RO', 'Read-Only'), ('PB', 'Public')], default='PR', max_length=2),
        ),
        migrations.RemoveField(
            model_name='switch',
            name='public',
        ),
        migrations.AddField(
            model_name='switch',
            name='public',
            field=models.CharField(choices=[('PR', 'Private'), ('RO', 'Read-Only'), ('PB', 'Public')], default='PR', max_length=2),
        ),
        migrations.RemoveField(
            model_name='ups',
            name='public',
        ),
        migrations.AddField(
            model_name='ups',
            name='public',
            field=models.CharField(choices=[('PR', 'Private'), ('RO', 'Read-Only'), ('PB', 'Public')], default='PR', max_length=2),
        ),
        migrations.DeleteModel(
            name='Public',
        ),
    ]