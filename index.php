<?php include 'facebookLoading.php'; ?>

<!DOCTYPE html>
<html lang="fr">
<head>
 
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
 
    <title>Agenda Culturel</title>
 
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
    <link href="css/style.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.isotope/2.2.0/isotope.pkgd.min.js"></script>
    <script src="js/jquery.fittext.js"></script>    
    <script src="js/imagesloaded.pkgd.min.js"></script>
    <script src="js/jquery.kinetic.js"></script>

</head>
<body>
    <div class="jumbotron">
            <div class="info">
                Comment publier un événement ?
            </div>
            <div class="contenu">
                <p><b>C'est simple...</b></p>
                <ul>
                    <li>Copiez le lien d'un évènement Facebook <b>public</b>.</li>
                    <li>Publiez le lien sur la page Facebook de l'Agenda.</li>                
                </ul>
                <p class="lien"><b>facebook.com/agendamontpellier</b></p>
                <img src='http://chart.apis.google.com/chart?cht=qr&amp;chs=200x200&amp;chl=https://www.facebook.com/agendamontpellier' id='facebookPage'>
                <p class="refresh">Rechargez la page !<p>
            </div>
        <h1>L'Agenda</h1>
        
            <img src="images/refresh.png" id="refreshImage">
            <p class="slogan">Trouvez et partagez des évènements à Montpellier !</p>
        
    </div>

<div id="container"></div>

<div class="loadmore"> Chargement en cours... </div>

<script type="text/javascript">
    // pass the PHP variables to js (events and access token)
    var events = <?php echo json_encode($eventsArray); ?>;
    var access_token = <?php echo json_encode($access_token); ?>;
</script>

<script src="js/main.js"></script> 

</body>
</html>