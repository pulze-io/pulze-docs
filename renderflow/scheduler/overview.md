---
title: "Scheduler"
sidebarTitle: "Automating Your Farm"
description: "Automate your render farm with a weekly scheduler. Activate workstations overnight, manage power, switch pools, and control spawner mode on a timed schedule."
"og:title": "RenderFlow Scheduler"
"og:description": "Automate render farm management with RenderFlow's built-in scheduler. Schedule node activation, shutdowns, restarts, pool changes, and maintenance windows on a weekly calendar."
"twitter:title": "RenderFlow Scheduler"
keywords: ['render farm scheduler', 'automate render nodes', 'workstation render overnight', 'render farm off-hours', 'scheduled rendering', 'render farm automation', 'render node power management']
---

The Scheduler lets you automate node and system actions on a weekly calendar. It works like a simplified Google Calendar: click a time slot, choose what should happen, select the affected nodes, and RenderFlow handles the rest.

Access the Scheduler from the main toolbar.

<Frame caption="Scheduler calendar with events for overnight rendering and weekend restarts">
  <img src="/images/renderflow/rf_scheduler_weekly_calendar.png" alt="Weekly calendar showing color-coded events for node activation, suspension, and restarts" />
</Frame>

## Creating an event

Click on any time slot in the calendar to open the event creation popup.

<Frame caption="New event creation popup">
  <img src="/images/renderflow/rf_scheduler_new_event.png" alt="Scheduler event creation popup with name, color, command type, time, and node selection" />
</Frame>

**Name** gives the event a label for easy identification.

**Color** is a visual indicator. You can use different colors to separate event types or priorities.

**Command Type** determines what action the event performs. The available commands are:

| Command | Category | What it does |
|---------|----------|--------------|
| Activate Node | Node | Sets the node to Idle so it can pick up tasks |
| Suspend Node | Node | Pauses the node |
| Finish Task and Suspend | Node | Lets the current task finish, then pauses |
| Reserve Node | Node | Sets the node to Reserved |
| Change Pool | Node | Moves the node to a different pool |
| Reboot | Node | Restarts the computer |
| Power Off | Node | Shuts down the computer |
| Wakeup | Node | Sends a Wake-on-LAN signal |
| Start Spawner | Node | Enables spawner mode |
| Stop Spawner | Node | Disables spawner mode |
| Maintenance Mode | System | Blocks new job submissions farm-wide |
| Auto Node Mode | System | Enables automatic idle detection |

**Settings** include an enabled toggle, an all-day option (removes end time), and a recurring option with repeat interval (daily, weekly, or monthly), interval count, and an end date.

**Start/End time** defines when the event runs.

**Select nodes** lets you choose which nodes are affected (for node commands).

## How events behave

Events fall into two categories.

**Instant events** like Reboot, Power Off, and Wakeup execute once at the event's start time and complete. The node is restarted or powered on, and the event is done.

**Duration events** like Activate Node or Suspend Node apply a state change at the start of the event and revert it at the end. For example, an Activate Node event from 7 PM to 7 AM will set a workstation to Idle at 7 PM (so it starts rendering) and switch it back to Suspended at 7 AM (so the artist can use it during the day).

## Managing events

Click an existing event to edit it. You can change any property, disable the event without deleting it, or delete it entirely. Non-recurring events can be dragged to a different time slot and resized by dragging the edges.

Navigate between weeks with the forward and back buttons. Click **Today** to return to the current week.

## Common setups

**Overnight workstation rendering.** Create a recurring Activate Node event from 7 PM to 7 AM on weekdays for all artist workstations. Machines render overnight and return to suspended before the workday starts.

**Weekend farm restart.** Schedule a Reboot event for all render nodes at Friday 11 PM to clear any accumulated issues before the weekend render batch.

**Pool merging for big jobs.** Schedule a Change Pool event to move all nodes into a single pool on Friday evening, then back to their project pools on Monday morning.

**Spawner mode for DR sessions.** Schedule Start Spawner and Stop Spawner events to automatically prepare nodes for distributed rendering during specific time windows.
