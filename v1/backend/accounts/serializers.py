from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from accounts.forms import PasswordResetForm

from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(read_only=True)

    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name")


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password_reset_form_class = PasswordResetForm

    def validate_email(self, value):
        self.reset_form = self.password_reset_form_class(data=self.initial_data)

        if not self.reset_form.is_valid():
            raise serializers.ValidationError(_("Incorrect information provided"))

        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError(_("This e-mail address does not exists"))
        return value

    def save(self):
        request = self.context.get("request")
        use_https = request.is_secure()
        opts = {
            "protocol": "https" if use_https else "http",
            "from_email": settings.DEFAULT_FROM_EMAIL,
            "email_template_name": "emails/reset_password.html",
            "html_email_template_name": "emails/reset_password.html",
            "request": request,
            "extra_email_context": {
                "user": User.objects.filter(email=self.data.get("email")).first()
            },
        }
        self.reset_form.save(**opts)
