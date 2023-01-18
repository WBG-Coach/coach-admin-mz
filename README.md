# Admin panel - Coach digital
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/WBG-Coach/coach-admin/blob/main/LICENSE.md)

> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

### You can access here:
[https://admin.coachdigital.org/](https://admin.coachdigital.org/)

<div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
  <img width="48%" src="https://user-images.githubusercontent.com/13595853/213301599-ccf7daba-ccd8-4c4f-b926-7e799ca743c8.png" />
  <img  width="48%" src="https://user-images.githubusercontent.com/13595853/213301627-468fb254-7438-4ea6-8311-1019d944ed43.png" />
</div>

## Getting Started

Add tour application configuration to your `.env` file in the root of your project:

```shell
REACT_APP_API_URL=
REACT_APP_AWS_BUCKET_NAME=
REACT_APP_GOOGLE_MAPS_KEY=
```

Install dependencies:

```shell
$ npm install
```

Start project:

```shell
$ npm run start
```

### Directory tree

    .
    ├── assets                      # Images
    │   └── ...                     
    ├── components                  # All componentes from application
    │   └── ...                     
    ├── hooks                       
    │   └── index.ts                # Custom hooks
    ├── i18n                        
    │   ├── en.json                 # English keys
    │   ├── pt.json                 # Portuguese keys
    │   └── index.ts                # i18n configuration
    ├── pages
    │   └── ...                     # All page files
    ├── routes
    │   └── index.ts                # Routes configurations
    ├── services
    │   └── ...                     # All apis from the aplications with Redux toolkit query
    ├── storage
    │   └── index.ts                # Functions to set and get information in local storage
    ├── store
    │   ├── auth                    # Reducers and selectors from auth context
    │   └── index.ts                # Redux configuration
    ├── theme
    │   └── index.ts                # Theme file
    └── util
    │   └── index.ts                # Util functions
    ├── ...
    └── index.ts                    # Provider configuration
    

### Main libraries
<div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
  <img width="15%" src="https://user-images.githubusercontent.com/13595853/213292865-f145bf92-2aac-419e-bd5d-5fc4c387e9cd.png" />
  <img width="15%" src="https://user-images.githubusercontent.com/13595853/213292795-8e0fd530-745c-4222-a69d-f6d61b3486d4.png" />
  <img width="15%" src="https://user-images.githubusercontent.com/13595853/213293171-b7eba42c-b3b7-49d6-bd6b-2ea9abff0e14.png" />
</div>
