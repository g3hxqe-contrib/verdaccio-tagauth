# verdaccio-tagauth

> Provides the ability to configure publish/unpublish access depending the the dist tag of the package

```yaml
auth:
  tagauth:
    'development':
      publish: $all
```


---

## development

See the [verdaccio contributing guide](https://github.com/verdaccio/verdaccio/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. 
Once you have completed that, use the following npm tasks.

  - `npm run build`

    Build a distributable archive

  - `npm run test`

    Run unit test

For more information about any of these commands run `npm run ${task} -- --help`.
