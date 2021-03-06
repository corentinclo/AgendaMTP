<?php /*
* @author Corentin CLOAREC & Jules CORDONNIER
*/

// The acces token of the application
$access_token = "367173486810462|Mg9xTK-LHVrNm45ni4O662B9hCw";
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>L'Agenda Montpellier</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link href="css/style.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.isotope/2.2.0/isotope.pkgd.min.js"></script>
    <script src="js/jquery.fittext.js"></script>
    <script src="js/imagesloaded.pkgd.min.js"></script>
    <script src="js/jquery.kinetic.js"></script>

    <link href='https://fonts.googleapis.com/css?family=PT+Sans:400,700' rel='stylesheet' type='text/css'>

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="57x57" href="images/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="images/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="images/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="images/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="images/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="images/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="images/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="images/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="images/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="images/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

</head>
<body>
    <div class="jumbotron">
            <div class="info">
                Comment publier un événement ?
            </div>
            <div class="contenu">
                <p><b>C'est simple...</b></p>
                <ul>
                    <li>Copiez le lien d'un événement Facebook <b>public</b></li>
                    <li>Publiez le lien sur la page Facebook de l'Agenda</li>
                </ul>
                <p class="lien"><b>facebook.com/agendamontpellier</b></p>
                <div id="QRCodeFB"></div>
                <p class="refresh">Puis <a href="facebookLoading">cliquez ici</a><p>
            </div>
        <h1>L'Agenda étudiant</h1>
        <img src="images/refresh.png" id="refreshImage">
        <p class="slogan">Trouvez et partagez des événements sur Montpellier !</p>
    </div>

<div id="container"></div>

<div class="loadmore">Chargement en cours...</div>

<script type="text/javascript">
    // On laisse la magie opérer (les évènements sont en cache, pour plus de rapidité au chargement)
    var events = <?php echo file_get_contents("cache/events.json"); ?>;
    var access_token = <?php echo json_encode($access_token); ?>;
</script>

<script src="js/main.js"></script>

</body>
</html>
