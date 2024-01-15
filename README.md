# Trello API

### Build RESTful API for FE application

- Board Services

  - Create a board [Public]:
    - End point: /v1/api/boards
    - Method: POST
    - Body:
      ```js
      {
        title: Board 01,
        description: Description board 01,
        type: 'public'
      }
      ```
  - Query board details [Public]:
    - End point: /v1/api/boards/65997af81e7c6ca8b896f571
    - Method: GET

  - Update board details [Public]:
    - End point: /v1/api/boards/65997af81e7c6ca8b896f571
    - Method: PATCH
    - Body:
      ```js
      {
        title: Board 01,
        description: Description board 01,
        type: 'public',
        columnOrderIds: ['65997af81e7c6ca8b896f571', '65997af81e7c6ca8b896f572']
      }
      ```
  - Move card between diff columns [Public]:
    - End point: /v1/api/boards/supports/moving_card
    - Method: PUT
    - Body:
      ```js
      {
        currentCardId: '65997af81e7c6ca8b896f571',
        prevColumnId: '65997af81e7c6ca8b896f571',
        prevCardOrderIds: ['65997af81e7c6ca8b896f571', '65997af81e7c6ca8b896f572']
        nextColumnId: '65997af81e7c6ca8b896f571',
        nextCardOrderIds: ['65997af81e7c6ca8b896f571', '65997af81e7c6ca8b896f572']
      }
      ```

- Column Services

  - Create a column [Public]:
    - End point: /v1/api/columns
    - Method: POST
    - Body:
      ```js
      {
        boardId: '65997af81e7c6ca8b896f571',
        title: Column 01
      }
      ```
  - Query column details [Public]:
    - End point: /v1/api/columns/65997af81e7c6ca8b896f571
    - Method: GET
      
  - Update column details [Public]:
    - End point: /v1/api/columns/65997af81e7c6ca8b896f571
    - Method: PATCH
    - Body:
      ```js
      {
        title: Column update 01,
        cardOrderIds: ['65997af81e7c6ca8b896f571', '65997af81e7c6ca8b896f572']
      }
      ```
  - Delete column details [Public]:
    - End point: /v1/api/columns/65997af81e7c6ca8b896f571
    - Method: DELETE
   
- Card Services

  - Create a column [Public]:
    - End point: /v1/api/cards
    - Method: POST
    - Body:
      ```js
      {
        boardId: '65997af81e7c6ca8b896f571',
        columnId: '65997af81e7c6ca8b896f571',
        title: Card 01
      }
        ```
  - Query column details [Public]:
    - End point: /v1/api/cards/65997af81e7c6ca8b896f571
    - Method: GET
