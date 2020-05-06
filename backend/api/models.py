from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=90, blank=False)
    age = models.PositiveSmallIntegerField(blank=False)
    goals = models.CharField(max_length=200, blank=False)