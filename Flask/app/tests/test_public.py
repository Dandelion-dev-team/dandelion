class TestPublic:
    def test_index(self, client):
        response = client.get("/api/")
        assert b"Welcome to Dandelion!" in response.data
