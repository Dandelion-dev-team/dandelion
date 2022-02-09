from unittest import TestCase
from app.tests.base import *
from app.admin.views.authority import listAuthority


class Test(TestBase):
    def test_list_authority(self):
        json_response = listAuthority()
        expected = b'{"help_url":"string","id":0,"name":"string","status":200,"unit":"string"}\n'

        self.assertEqual(expected, json_response.data)

