from unittest import TestCase
from app.tests.base import *
from app.admin.views.subject_group import list_subject_groups


class Test(TestBase):
    def test_list_subject_groups(self):
        json_response = list_subject_groups()
        expected = b'{"help_url":"string","id":0,"name":"string","status":200,"unit":"string"}\n'

        self.assertEqual(expected, json_response.data)

