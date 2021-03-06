<?php
/*
* @author Corentin CLOAREC & Jules CORDONNIER
*/

header('Content-Type: application/json; charset=utf-8');
setlocale(LC_TIME, 'fr', 'fr_FR', 'fr_FR.UTF-8');

function jsonRemoveUnicodeSequences($struct) {
   return preg_replace("/\\\\u([a-f0-9]{4})/e", "iconv('UCS-4LE','UTF-8',pack('V', hexdec('U$1')))", json_encode($struct));
}

if (time() - filemtime('cache/update.token') > 120) {
  // Ne recharge le cache qu'une fois à intervalles régulier - attente d'au moins 2min entre chaque recharge - automatique toutes les heures (tache cron)
  touch('cache/update.token');
  // The id of the page L'Agenda
  $fb_page_id = "1436089993356040";

  // The acces token of the application
  $access_token = "367173486810462|Mg9xTK-LHVrNm45ni4O662B9hCw";
  // The acces token of the page (to delete posts)
  $page_access_token = "CAAFN8T1AlV4BAJyocN14itEZCpja1L1FcNhqbeYWlkdxbqwQaB16BYxkYVSHbQPPLjXXun41E8Op4LKtktHZCGxK7OMKmV0FpZCenz8UAwpxHRPv0OZA8EnfGKHAzIXosGetnwIy30QLINNSVjG99AZAomlUJtAqhqE5cWbZBxa2dYAVftsYhDL3JoFA4D35ZCxEkMapRczkGa782ZA3IDWxJVZClv0O85nEELx70LkAX5gZDZD";

  // Get the posts on the page (= tagged)
  $fields="link,to,description,message";
  $json_link = "https://graph.facebook.com/{$fb_page_id}/feed/?fields={$fields}&access_token={$access_token}&limit=100";
  $json = file_get_contents($json_link);
  $obj = json_decode($json, true, 512, JSON_BIGINT_AS_STRING);

  // Hide warning errors
  error_reporting(E_ERROR | E_PARSE);

   // count the number of posts
  $post_count = count($obj['data']);
  $eventsArray = array();
      for($i=0; $i<$post_count; $i++){
          //look if the link in the post is an event
          $eventLink = $obj['data'][$i]['message'];
          if (preg_match("#https://www.facebook.com/events/([0-9]+)/#", $eventLink)){
              if (isset($obj['data'][$i]['to']['data'][1])) { // only existing
  	            // get the event's ID
  	            $eventId = $obj['data'][$i]['to']['data'][1]['id'];
  	            // look if the event is not already added
  	            if(!(in_array($eventId, $eventsArray))){
  	                // get the event's start time
  	                $date = $obj['data'][$i]['to']['data'][1]['start_time'];
  	                //We look if the event is past or not
  	                $timestamp = strtotime($date);
                  $eventsForces = array(/* "757693680994459", "924459167593710", "788978327818430", "887044594680093" */);
                    $eventsBannis = array("972299266145646");
  	                if( !in_array($eventId, $eventsBannis) && ($timestamp > time() || in_array($eventId, $eventsForces)) ){
  	                    //we add the event to the list
  	                    $eventsArray[$date] = $eventId;
  	                }
  	                else {
  	                	//delete past posts
  			 			$postToDelete = $obj['data'][$i]['id'];
  			    		$json_link2 = "https://graph.facebook.com/{$postToDelete}/?access_token={$page_access_token}&method=delete";
  			    		$json2 = file_get_contents($json_link2);
          			}
  	            }
          	}
          	else {
          		//delete fake event link post
  	 			$postToDelete = $obj['data'][$i]['id'];
  	    		$json_link2 = "https://graph.facebook.com/{$postToDelete}/?access_token={$page_access_token}&method=delete";
  	    		$json2 = file_get_contents($json_link2);
          	}
          }
          else {
          	//delete not event post
   			$postToDelete = $obj['data'][$i]['id'];
      		$json_link2 = "https://graph.facebook.com/{$postToDelete}/?access_token={$page_access_token}&method=delete";
      		$json2 = file_get_contents($json_link2);
          }
      }
  // sort the array by date (= by key)
  ksort($eventsArray);

  // Met les évènements en cache
  $file = "cache/events.json";
  $current = jsonRemoveUnicodeSequences($eventsArray);
  file_put_contents($file, $current);
}


header('Location: .');
?>
