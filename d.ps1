$cmd = $Args[0]
$name = "prpr-fb"
$de = "docker exec -ti $name"
$npm = "$de sh -c 'cd functions; npm run"

function convert_win_path($cmd)
{
  $DOCKER_CONVERT_WINDOWS_PATHS = 1
  echo $cmd
  iex $cmd
}

function npmrun($body)
{
  return "$de sh -c 'cd functions; npm run $body'"
}



switch ($cmd) 
{
    "build" {convert_win_path "docker build . -t $name"}
    "run" {convert_win_path "docker run -ti -d --rm --name $name -v $($pwd.Path):/app -p 9005:9005 $name sh; docker exec -ti $name firebase login"}
    "stop" {convert_win_path "docker stop $name"}
    "serve" {convert_win_path(npmrun("serve:local"))}
    default {convert_win_path "$de $cmd"}
}