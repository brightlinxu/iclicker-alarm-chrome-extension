# iClicker Chrome Extension

Hey everyone! I built this chrome extension to sound an alarm every time a new iClicker question is in progress.

## Getting started

Coming soon...

## How it works

For anyone that's curious, this chrome extension looks for DOM changes on the iClicker website using Mutation Observers. When an active question pops up, the script looks for id=TODO that's inserted into the DOM (this means a new question is active). Once a new question is active, an alarm will sound.
