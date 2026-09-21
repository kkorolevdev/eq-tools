# EQ Timer

A simple browser-based timer designed for **EverQuest** players who need to keep track of mob respawn timers while camping multiple targets in a zone.

The tool lets you set a respawn time once and run independent timers for multiple mobs. Each timer can be paused, resumed, reset, and given a custom label.

## Features

- ⏱️ Set a common respawn duration for all timers
- 🎯 Track multiple mobs independently
- ▶️ Start and pause individual timers
- ⏯️ Resume paused timers
- 🔄 Reset a timer to the configured respawn duration
- ✏️ Give each timer a custom name
- ⚠️ Visual warnings as the respawn time approaches
- ✅ Visual indication when the timer reaches zero
- ➖ Continue counting past zero to show how long the mob has been overdue
- 🖥️ Runs entirely in the browser — no server or backend required

## Why?

When camping mobs in EverQuest, keeping track of several respawn timers at once can be inconvenient, especially when you're switching between targets or doing other things while waiting.

EQ Timer provides a simple visual way to keep track of each camp:

```text
Mob / Target          Timer
─────────────────────────────
Target 1              00:12:43
Target 2              00:03:18
Target 3              00:00:42
Target 4              -00:01:27
```

A timer turning negative means that the expected respawn time has passed. This makes it easy to see which camps are still waiting and which ones may already be ready.

## How to Use

### 1. Set the respawn time

Enter the expected respawn duration using the **minutes** and **seconds** fields and click **Set Time**.

For example:

```text
Minutes: 15
Seconds: 00
```

This sets all timers to:

```text
00:15:00
```

### 2. Name your targets

Each timer can be given a custom name.

Click **Edit**, enter the mob or camp name, and click **Save**.

For example:

- Named Mob
- Placeholder
- Rare Spawn
- Camp 1
- Camp 2

### 3. Start a timer

Click **Start** for the corresponding target.

The timer begins counting down independently of the other timers.

### 4. Pause a timer

Click **Pause** to temporarily stop the countdown.

The button changes to **Continue**. Click it again to resume the timer.

### 5. Reset a timer

Click **Reset** to stop the timer and return it to the currently configured respawn duration.

For example, if the configured duration is 20 minutes:

```text
00:20:00 → Start → ... → Reset → 00:20:00
```

## Timer Warnings

The timer uses visual states to indicate how much time remains.

| Time remaining | State |
|---|---|
| More than 60 seconds | Normal |
| 60–31 seconds | Attention |
| 30–1 seconds | Warning |
| 0 seconds | Complete |
| Below 0 | Overdue |

Once the timer reaches zero, it changes to the **complete** state and the Start button is hidden.

The timer then continues below zero, allowing you to see how long it has been since the expected respawn time:

```text
00:00:30
00:00:05
00:00:00
-00:00:01
-00:00:30
-00:01:15
```

This is useful when respawns are approximate or when you want to know how long a target has potentially been available.

## Timer Accuracy

The timer uses the browser's current time (`Date.now()`) rather than simply subtracting one second on every `setInterval()` callback.

This is intentional.

Browser timers are not guaranteed to execute exactly once per second. Using elapsed wall-clock time prevents small delays from accumulating over the lifetime of a timer.

In other words, the timer calculates:

```text
elapsed time = current time - start time
```

rather than assuming:

```text
number of callbacks × 1 second
```

This makes the countdown more reliable if the browser temporarily delays JavaScript execution.

## Multiple Timers

Each `.eq-timer__group` has its own timer state.

Starting, pausing, or resetting one timer does not affect the others.

The global **Set Time** control establishes the duration used by the timer groups, while each group maintains its own:

- countdown state
- remaining time
- pause state
- display
- warning state

This makes the tool suitable for tracking several mobs simultaneously.

## Requirements

EQ Timer is a client-side web application and requires only a modern web browser.

No:

- PHP
- database
- server
- API
- external service

is required.

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Or download the repository and open the HTML file in a browser.

There is no build process required unless you modify the project to introduce one.

## Project Structure

A typical project structure looks like:

```text
eq-timer/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── timer.js
└── README.md
```

The JavaScript contains the timer logic, while the HTML defines the timer groups and controls.

## Customization

Timer groups are identified by the following class:

```html
.eq-timer__group
```

The main controls use:

```text
#setTimeBtn
#zoneRespMin
#zoneRespSec
```

Individual timer controls use:

```text
.eq-timer__start
.eq-timer__reset
.eq-timer__group-label-edit
```

The timer display itself uses:

```text
.timer
```

Timer state classes are:

```text
.attention
.warning
.complete
```

These classes can be styled in CSS to create the desired visual appearance.

## Important Behavior

Changing the respawn duration with **Set Time** updates the displayed duration of every timer.

It does not attempt to synchronize already-running timers with a new duration.

For example, if the current duration is 15 minutes and three timers are already running, changing the duration to 20 minutes is intended to establish the new duration for subsequent resets/starts rather than retroactively changing the elapsed time of active timers.

## EverQuest

EQ Timer is an unofficial fan-made utility for use with **EverQuest**.

It is not affiliated with, endorsed by, or sponsored by Daybreak Game Company or the EverQuest development team.

EverQuest and related names and trademarks belong to their respective owners.

## License

Add your preferred license here.

For example, if you want to release the project under the MIT License:

```text
MIT License
```

See the `LICENSE` file for the complete license text.

## Contributing

Suggestions, bug reports, and improvements are welcome.

If you find an issue or have an idea for improving the timer, feel free to open an issue or submit a pull request.

---

**Built as a small quality-of-life tool for EverQuest camps.**