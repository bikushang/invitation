// Generates direct Google Calendar link and downloadable .ics files for wedding events

export function getGoogleCalendarUrl(event, coupleName = 'Wedding') {
  try {
    const title = encodeURIComponent(`${event.name || 'Wedding Celebration'} — ${coupleName}`);
    const details = encodeURIComponent(
      `${event.subtitle || 'Celebration'}\nVenue: ${event.venue || ''}, ${event.location || ''}\nJoin us to celebrate with love and blessings!`
    );
    const location = encodeURIComponent(`${event.venue || ''}, ${event.location || ''}`);

    // Create a rough date/time representation or fallback to default
    const now = new Date();
    const startIso = now.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endIso = new Date(now.getTime() + 4 * 3600000).toISOString().replace(/-|:|\.\d\d\d/g, '');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  } catch (e) {
    return '#';
  }
}

export function downloadIcsFile(event, coupleName = 'Wedding') {
  try {
    const title = `${event.name || 'Wedding Event'} - ${coupleName}`;
    const description = `${event.subtitle || 'Celebration'}\\nVenue: ${event.venue || ''}, ${event.location || ''}`;
    const location = `${event.venue || ''}, ${event.location || ''}`;
    const now = new Date();
    const dtStamp = now.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The Invitation Media//Wedding Builder//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Math.random().toString(36).slice(2)}@weddinginvite.com`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${dtStamp}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(event.name || 'wedding_event').toLowerCase().replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('ICS export failed', e);
  }
}
