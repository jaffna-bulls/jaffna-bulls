const NEWS = [
  {
    slug: "officially-join-the-next-xv",
    tag: "Jaffna Bulls News",
    date: "August 21, 2026",
    title: "Jaffna Bulls Officially Join the Next XV Rugby League for 2026",
    subtitle:
      "Franchise confirms its leadership team ahead of the inaugural 2026 campaign",
    images: [],
    competitionAtAGlance: {
      eyebrow: "The Next XV",
      title: "2026 Competition at a Glance",
      stats: [
        { value: "140", label: "Leading schoolboy players" },
        { value: "4", label: "Franchises" },
        { value: "U20", label: "A pathway to Sri Lanka U20 selection" },
      ],
    },
    blocks: [
      {
        type: "paragraph",
        parts: [
          "The ",
          { type: "bold", text: "Jaffna Bulls " },
          "are proud to announce their official entry into the",
          { type: "bold", text: " Next XV Rugby League" },
          " for the 2026 season, marking an important new chapter for the franchise and its commitment to developing the next generation of Sri Lankan rugby talent.",
        ],
      },
      {
        type: "paragraph",
        parts: [
          "The Jaffna Bulls are co-owned by ",
          { type: "bold", text: "Prad Navaratnam, Udesh Dharmadasa " },
          "and",
          { type: "bold", text: " Dhovika Seneviratne. " },
          ,
          "Together, the ownership group is focused on building a sustainable, high-performance sporting franchise that represents the pride, resilience and ambition of Jaffna and the Northern Province, while creating opportunities for talented young athletes from across Sri Lanka.",
        ],
      },
      {
        type: "paragraph",
        parts: [
          "In addition to his role as co-owner, ",
          { type: "bold", text: "Dhovika Seneviratne " },
          "serves as ",
          { type: "bold", text: "Director - Operations," },
          ,
          "providing leadership across the franchise’s operational activities and key initiatives.",
          { type: "bold", text: " Pulinda Rupesinghe " },
          "has been appointed",
          { type: "bold", text: " General Manager" },

          " and will lead the day-to-day management of the franchise.",
        ],
      },
      {
        type: "heading",
        text: "Building the Bulls Rugby Program",
      },
      {
        type: "paragraph",
        parts: [
          "The franchise has appointed",
          { type: "bold", text: " Tarinda Ratwatte" },
          " as ",
          { type: "bold", text: " Head of Rugby " },
          "to build, shape and lead the Jaffna Bulls rugby program. He will be responsible for establishing the program’s direction, standards and culture as the Bulls prepare for their first Next XV Rugby League campaign. He will work closely with the franchise’s rugby coaching team to prepare the selected Bulls squad for the inaugural competition.",
        ],
      },
      {
        type: "heading",
        text: "About the Next XV Rugby League",
      },
      {
        type: "paragraph",
        parts: [
          "The Next XV Rugby League will bring together the top ",
          { type: "bold", text: "140 schoolboy rugby players " },
          "players identified from the 2026 schoolboy rugby season. The players will enter a franchise competition featuring four teams:  ",
          {
            type: "bold",
            text: "Colombo Aces, Kandy Tuskers, Galle Lions and Jaffna Bulls.",
          },
          ,
          " With all games to be televised on PeoTV and on YouTube via the KSN channel.",
        ],
      },
      {
        type: "paragraph",
        parts: [
          "The league is run by ",
          { type: "bold", text: "Eventistry " },
          "and endorsed by ",
          {
            type: "bold",
            text: "Sri Lanka Rugby",
          },
          ,
          "It has been created to provide an elite competitive platform for the country’s leading emerging players and to help bridge the pathway from schoolboy rugby to higher levels of the game.",
        ],
      },
      {
        type: "paragraph",
        parts: [
          "Performances in the league will form part of the selection pathway for the",
          { type: "bold", text: "Sri Lanka Junior Tuskers, " },
          "the ",
          {
            type: "bold",
            text: "national U20 team,",
          },
          ,
          " giving players the opportunity to earn national recognition through their performances in the franchise competition.",
        ],
      },

      {
        type: "quote",
        text: "Joining the Next XV Rugby League is a landmark moment for the Jaffna Bulls. We are excited to be part of a competition that will help shape the future of Sri Lankan rugby and provide an elite platform for emerging players to showcase their talent.”",
        cite: "Dhovika Seneviratne, Co-Owner & Director - Operations",
      },
      {
        type: "heading",
        text: "Looking Ahead",
      },
      {
        type: "paragraph",
        text: "The Jaffna Bulls will continue preparations for the 2026 season, with further announcements on player selections, franchise initiatives and supporter engagement to follow as the competition approaches.",
      },
      {
        type: "heading",
        text: "About Jaffna Bulls",
      },
      {
        type: "paragraph",
        text: "Jaffna Bulls is a multi-sport franchise committed to building high-performance sporting programs, developing emerging athletes and creating a strong community-driven sporting identity. The franchise proudly represents Jaffna and the Northern Province under the banner of #NorthernPride and #BullNation.",
      },
      //   {
      //     type: "paragraph",
      //     text: "As official announcements are confirmed, this space will bring the Bull Nation closer to the people and moments shaping our journey.",
      //     emphasis: "bold",
      //   },
    ],
  },
];

export function getNewsBySlug(slug) {
  return NEWS.find((item) => item.slug === slug);
}

export default NEWS;
