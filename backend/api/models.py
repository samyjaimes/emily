from django.db import models


class Profiles(models.Model):
    name = models.CharField(max_length=90, blank=False)
    age = models.PositiveSmallIntegerField(blank=False)
    goals = models.CharField(max_length=200, blank=False)


class Activities(models.Model):
    title = models.CharField(max_length=120, blank=False)
    preparation = models.TextField(blank=False)
    description = models.TextField(blank=False)
    age_min = models.PositiveSmallIntegerField(blank=False, default=1)
    age_max = models.PositiveSmallIntegerField(blank=False, default=6)
    duration = models.PositiveSmallIntegerField(blank=False, default=5)
    didactic = models.FloatField(blank=False, default=0.0)
    movement = models.FloatField(blank=False, default=0.0)
    creativity = models.FloatField(blank=False, default=0.0)
    relaxing = models.FloatField(blank=False, default=0.0)


class Goals(models.Model):
    name = models.CharField(max_length=30, blank=False)


class Schedules(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    activities = models.ManyToManyField(Activities, through='Timetables')

    class Meta:
        ordering = ['created_at']


class Timetables(models.Model):
    activity = models.ForeignKey(Activities, on_delete=models.CASCADE, null=True)
    schedule = models.ForeignKey(Schedules, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()


class ActivityRating(models.Model):
    activity = models.ForeignKey(Activities, on_delete=models.CASCADE, null=True)
    profile = models.ForeignKey(Profiles, on_delete=models.CASCADE)
    rated_at = models.DateTimeField(auto_now_add=True)
    rating_score = models.PositiveSmallIntegerField()

    class Meta:
        ordering = ['rating_score']
        db_table = 'api_activity_rating'
        unique_together = ['activity_id', 'profile_id']


class ProfileSchedule(models.Model):
    profile = models.OneToOneField(Profiles, on_delete=models.CASCADE)
    schedule = models.ForeignKey(Schedules, on_delete=models.CASCADE)

    class Meta:
        ordering = ['profile']
        db_table = 'api_profile_schedule'


class EditedActivities(models.Model):
    activity = models.ForeignKey(Activities, on_delete=models.CASCADE, related_name='activity', null=True)
    activity_origin = models.ForeignKey(Activities, on_delete=models.CASCADE, related_name='activity_origin', null=True)
    schedule = models.ForeignKey(Schedules, on_delete=models.CASCADE)
    edited_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'api_edited_activities'
