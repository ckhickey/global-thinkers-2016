GT Base
===

Base configuration for Global Thinkers site. The idea is, starting with '16, to port all GT sites to a single domain.

Example
---

Run local App Engine server:

```shell
$ ./bin/start.sh # NOTE: This will build submodules as well so may take awhile
```

If submodules built, you can run the faster:

```shell
$ ./bin/run.sh
```

Deploying:

```shell
$ ./bin/deploy.sh
```

Resources
---

* [Git Submodule](https://chrisjean.com/git-submodules-adding-using-removing-and-updating/)
* [More Submodules](https://github.com/blog/2104-working-with-submodules)

Notes
---

### Routing to a submodule

For example, if we have a submodule in the directory `t/`, here's a snippet we could use for `app.yaml`:

```yaml
- url: /t(/.*)?
  script: t.main.APP
  secure: always
```

Then in `t/` we would `__init__.py` and `main.py`:

```shell
$ ls t/
__init__.py
main.py
```

`main.py` can look similar to the base `main.py`, but with app routes adjusted, for example:

```py
@APP.route('/t/')
```
