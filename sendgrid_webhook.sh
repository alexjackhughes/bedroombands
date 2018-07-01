function localtunnel {
  lt -s https://sakjndslajnakjxjsx.localtunnel.me/ --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
