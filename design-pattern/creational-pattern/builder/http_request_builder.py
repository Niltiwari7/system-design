class HttpRequestBuilder:
  def __init__(self, builder):
    self.url = builder._url
    self.method = builder._method
    self.headers = dict(builder._headers)
    self.query_params = dict(builder._query_params)
    self.body = builder._body
    self.timeout = builder._timeout

  def __str__(self):
    return f"HttpRequestBuilder{{url={self.url}, method={self.method}, headers={self.headers}, query_params={self.query_params}, body={self.body}, timeout={self.timeout}}}"


  class Builder:
    def __init__(self):
      self._url = None
      self._method = "GET"
      self._headers = {}
      self._query_params = {}
      self._body = None
      self._timeout = 30

    def set_url(self, url):
      self._url = url
      return self

    def set_method(self, method):
      self._method = method
      return self

    def add_header(self, key, value):
      self._headers[key] = value
      return self

    def add_query_param(self, key, value):
      self._query_params[key] = value
      return self

    def set_body(self, body):
      self._body = body
      return self

    def set_timeout(self, timeout):
      self._timeout = timeout
      return self

    def build(self):
      if not self._url:
        raise ValueError("URL must be set")
      return HttpRequestBuilder(self)