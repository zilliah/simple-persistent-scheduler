# TODO
- will need to output with start time of each task
    -> just add as text to li (start of row is fine)
- number validation

- add donation link (patreon?)
- did colours with flux on, look at in daylight
- add a "saved" message

# CURR
- need to do time calcs (not done yet)
- errors for missing start/end time, or having both
    -> this is done, but what about saving form w/out a specific time?
    -> maybe allow it to run but prevent calculations


# Error handling for
- empty list (error w/ nothing filled in, fails silently but error in console)
- empty tasks
- time isn't numbers (can enter letters on FF)
- entires with blank stuff 

# make fancier:
- could add time padding option (+n to end of each task, or overall?)
- allow reordering of tasks
- allow multiple schedules
- dark mode/colour selector
- checkboxes (tried it but it messed stuff up and it's lower priority so ignoring for now)
    - have checkboxes grey stuff out
    - uncheck all boxes
    - make them optional?
- "set to now" for time buttons?
- could add a "back to top" button at the bottom if the list is longer than 6 or sth? probs not worth it tho
- refactor into separate files?
- let people copy saved storage string

# DONE
- clear schedule
- reload from saved
