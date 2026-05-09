import re

with open('index.html', 'r') as f:
    content = f.read()

# .l-sidebar
content = re.sub(
    r'(\.l-sidebar\s*\{[^\}]*)color:\s*var\(--ui-ink\);\n\s*',
    r'\1',
    content
)

# .project-name
content = re.sub(
    r'(\.project-name\s*\{[^\}]*)color:\s*var\(--ui-ink\);\n\s*',
    r'\1',
    content
)

# .project-description
content = re.sub(
    r'(\.project-description\s*\{[^\}]*)color:\s*var\(--ui-ink\);\n\s*',
    r'\1',
    content
)

# .control-row
content = re.sub(
    r'(\.control-row\s*\{[^\}]*)(color:\s*var\(--ui-ink\);\n\s*background:\s*transparent;\n\s*font-family:\s*\'Space Mono\', monospace;\n\s*font-size:\s*var\(--ui-text-size\);\n\s*line-height:\s*1;\n\s*)',
    r'\1font-size: var(--ui-text-size);\n      ',
    content
)

# .control-value
content = re.sub(
    r'(\.control-value\s*\{[^\}]*)color:\s*var\(--ui-ink\);\n\s*',
    r'\1',
    content
)

# .sidebar-toggle
content = re.sub(
    r'(\.sidebar-toggle\s*\{[^\}]*)(color:\s*var\(--ui-ink\);\n\s*background:\s*none;\n\s*border:\s*none;\n\s*font-family:\s*\'Space Mono\', monospace;\n\s*font-size:\s*var\(--ui-text-size\);\n\s*line-height:\s*1;\n\s*)',
    r'\1font-size: var(--ui-text-size);\n      ',
    content
)

# .button
content = re.sub(
    r'(\.button\s*\{[^\}]*)(background:\s*transparent;\n\s*color:\s*var\(--ui-ink\);\n\s*font-family:\s*\'Space Mono\', monospace;\n\s*font-size:\s*var\(--ui-text-size\);\n\s*text-transform:\s*uppercase;\n\s*cursor:\s*pointer;\n\s*line-height:\s*1;\n\s*)',
    r'\1font-size: var(--ui-text-size);\n      text-transform: uppercase;\n      cursor: pointer;\n      ',
    content
)

# .icon-button
content = re.sub(
    r'(\.icon-button\s*\{[^\}]*)(background:\s*transparent;\n\s*border:\s*none;\n\s*cursor:\s*pointer;\n\s*color:\s*var\(--ui-ink\);\n\s*)',
    r'\1cursor: pointer;\n      ',
    content
)

# .slider-thumb
content = re.sub(
    r'(\.slider-thumb\s*\{[^\}]*)(font-family:\s*\'Space Mono\', monospace;\n\s*)',
    r'\1',
    content
)

# .toggle-cell
content = re.sub(
    r'(\.toggle-cell\s*\{[^\}]*)(color:\s*var\(--ui-ink\);\n\s*font-family:\s*\'Space Mono\', monospace;\n\s*)',
    r'\1',
    content
)

with open('index.html', 'w') as f:
    f.write(content)
print("Done")
