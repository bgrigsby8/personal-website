#!/bin/bash

# Check if an argument was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <inputfile>"
    exit 1
fi

# Extract filename without extension
filename=$(basename -- "$1")
extension="${filename##*.}"
filename="${filename%.*}"

# Define output file
output="${filename}_reversed.${extension}"

# Command to reverse the video and audio
ffmpeg -i "$1" -vf reverse -af areverse "$output"

echo "Reversed video saved as $output"
