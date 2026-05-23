<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap CSS -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
    >

    @viteReactRefresh
    @vite('resources/js/app.jsx')

    <!-- Title -->
  <title>BudgetFlow - Notes & Finance Management</title>

    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body{
            background-color: #f4f7fb;
            min-height: 100vh;
            font-family: Arial, Helvetica, sans-serif;
            color: #212529;
        }

        #app{
            min-height: 100vh;
        }

        /* Optional modern scrollbar */
        ::-webkit-scrollbar{
            width: 8px;
        }

        ::-webkit-scrollbar-thumb{
            background-color: #c5cbd3;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-track{
            background-color: #eef2f7;
        }
    </style>
</head>

<body>

    <!-- React App -->
    <div id="app"></div>

    <!-- Bootstrap JS -->
    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous">
    </script>

</body>
</html>