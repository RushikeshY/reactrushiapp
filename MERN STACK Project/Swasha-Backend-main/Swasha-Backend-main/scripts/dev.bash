sudo docker start mongo
set-hook -g session-created 'set remain-on-exit on'
tmux new-session -c . -d -s "swasha" -n "one" bash
tmux set -t swasha status
tmux new-window -c client -t swasha: -n "two" "npm run dev ; bash"
tmux split-window -c server -t swasha:two "npm run dev;bash"

tmux a -t swasha
