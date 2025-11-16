# Bets-or-Banter
Making betting better. "Bet" you didn't see that one coming?

Bets or Banter is a platform that lets users explore markets of interest. By leveraging AI-driven sentiment insights, sourced from up-to-date news articles, users can identify the most relevant and optimal trading opportunities in real time.

# Inspiration
We’re just two college students who can't resist making bets with each other -- but not just for entertainment value. We're both always fascinated with how mathematical logic and economics can be used to predict the most unexpected real-world outcomes, from the words that tech companies use during earnings calls to political victory margins to the upset victories of underdog sports teams. When we both joined Kalshi this year, a regulated financial platform that lets you trade based on the outcome of real-world events, we both recognized how exciting and rewarding the investment world could be. It got us wondering: Why didn't we do it sooner?

The truth is that we, like many others today, were caught up in the big numbers: The percentages, statistics, corporate lingo, and general feeling that online trading is meant for those with highly specialized knowledge about the stock market and all of its players. But we learned that success really comes down to curiosity, research, and persistence. With the right tools, anyone can start making informed decisions and identifying the optimal trades that put them ahead.

That’s why we created Bets or Banter: a platform designed to help users build confidence in key investing skills, such as risk management, probability-based thinking, and decision-making, through the familiar, gamified lens of online betting. The name, Bets or Banter, captures the heart of what we built: a place where smart, data-driven trading meets the humanistic, social banter that makes prediction-making an exciting experience.

# What it does
Bets or Banter is a platform that lets users explore markets of interest. By leveraging AI-driven sentiment insights, sourced from up-to-date news articles, users can identify the most relevant and optimal trading opportunities in real time.

# How we built it
The backend was engineered with Python and FastAPI, integrating APIs from the trading platform Kalshi to enable users to explore trading opportunities across relevant markets. The backend also incorporated the New York Times API to provide real-time insights on developing events that could impact market outcomes, and the Gemini API to analyze sentiment from relevant articles.

The frontend was built with JavaScript, HTML, CSS, and React, allowing for a responsive interface that allows users to navigate markets intuitively, monitor live data, and engage with AI-driven insights.

Challenges we ran into
This was our first time integrating a JavaScript frontend with a Python backend, which presented challenges as each of us was more proficient in one language than the other. Successfully building the project required clear communication, persistence, and quick problem-solving to tackle issues as they emerged.

While integrating the Gemini API, we faced restrictions on the number of links we could open, which limited the volume of sentiment data we could process concurrently and forced us to optimize how we selected and retrieved sources.

Managing time was also a challenge, given the ambitious scope of the project. It required us to work on multiple components concurrently, oftentimes creating temporary placeholders to accommodate expected data or formats while development was still underway.

# Accomplishments that we're proud of
We’re proud to have created a final product that closely aligns with the vision we initially imagined. Although we anticipated major adjustments to our planned steps and tools in order to meet deadlines, we were able to overcome technical challenges through consistent, clear communication and a shared confidence in our ability to bring the project to life.

# What we learned
We strengthened our understanding of using both JavaScript and Python to integrate API calls, specifically from the Gemini API. We also gained hands-on experience with managing asynchronous workflows across multiple services, handling real-time data, and ensuring consistency between our backend logic and frontend interface. We learned how to quickly adapt to unfamiliar tools and refine our approach based on new constraints.

# What's next for Bets or Banter
Moving forwards, we plan to integrate functionality that allows users to place trades directly through Bets or Banter.

We’re also seeking funding to expand the range of search results we can pull from the Kalshi API, giving users access to more relevant markets. Funding would enable us to query multiple article sources through a more expansive version of the Gemini API, allowing for a deeper and more accurate sentiment analysis.

In addition, we hope to integrate other APIs that can crowdsource sentiment like Reddit or X (formerly Twitter) to provide richer, community-driven analysis that strengthen users’ decision-making when placing trades.
