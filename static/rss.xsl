<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html>
<head>
    <title><xsl:value-of select="/rss/channel/title"/> - RSS Feed</title>
    <style>
        :root {
            --bg: #fafafa;
            --text: #1a1a1a;
            --text-secondary: #6b7280;
            --accent: #6366f1;
            --border: #e5e7eb;
        }
        @media (prefers-color-scheme: dark) {
            :root {
                --bg: #0f0f0f;
                --text: #f5f5f5;
                --text-secondary: #9ca3af;
                --border: #2d2d2d;
            }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.6;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
        }
        .header {
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--border);
        }
        .header h1 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        .header p {
            color: var(--text-secondary);
            font-size: 0.875rem;
        }
        .info-box {
            background: var(--accent);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            font-size: 0.875rem;
        }
        .info-box a {
            color: white;
            font-weight: 600;
        }
        .item {
            padding: 1.25rem 0;
            border-bottom: 1px solid var(--border);
        }
        .item:last-child {
            border-bottom: none;
        }
        .item-title {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        .item-title a {
            color: var(--text);
            text-decoration: none;
        }
        .item-title a:hover {
            color: var(--accent);
        }
        .item-meta {
            font-size: 0.75rem;
            color: var(--text-secondary);
            margin-bottom: 0.75rem;
        }
        .item-description {
            font-size: 0.875rem;
            color: var(--text-secondary);
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📡 <xsl:value-of select="/rss/channel/title"/></h1>
        <p><xsl:value-of select="/rss/channel/description"/></p>
    </div>
    
    <div class="info-box">
        <strong>This is an RSS feed.</strong> Subscribe by copying the URL into your RSS reader.
        <a href="https://aboutfeeds.com">Learn more about RSS</a>
    </div>
    
    <div class="items">
        <xsl:for-each select="/rss/channel/item">
            <div class="item">
                <h2 class="item-title">
                    <a>
                        <xsl:attribute name="href">
                            <xsl:value-of select="link"/>
                        </xsl:attribute>
                        <xsl:value-of select="title"/>
                    </a>
                </h2>
                <div class="item-meta">
                    <xsl:value-of select="pubDate"/>
                </div>
                <p class="item-description">
                    <xsl:value-of select="description"/>
                </p>
            </div>
        </xsl:for-each>
    </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
