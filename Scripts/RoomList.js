document.addEventListener("DOMContentLoaded", () => {
  const rooms = [
    {
      name: "Deluxe Twin Bed",
      image: "../RoomVariety/Deluxe-Twin/Deluxe Twin1.jpg",
      link: "Rooms/Deluxe-Twin-Bed.html",
      size: "35 m²",
      occupancy: "2",
      available: "38",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni cumque numquam quia consequatur aperiam.",
    },
    {
      name: "Cozy King Bed",
      image: "../RoomVariety/Deluxe-Twin/Deluxe Twin1.jpg",
      link: "#",
      size: "59 m²",
      occupancy: "2",
      available: "16",
      description: "",
    },
    {
      name: "Poolside King Bed",
      image: "../RoomVariety/Deluxe-Twin/Deluxe Twin1.jpg",
      link: "#",
      size: "",
      occupancy: "",
      available: "",
      description: "",
    },
    {
      name: "Private Pool Suite",
      image: "../RoomVariety/Deluxe-Twin/Deluxe Twin1.jpg",
      link: "#",
      size: "",
      occupancy: "",
      available: "",
      description: "",
    },
    {
      name: "Superior Twin Bed",
      image: "../RoomVariety/Deluxe-Twin/Deluxe Twin1.jpg",
      link: "#",
      size: "",
      occupancy: "",
      available: "",
      description: "",
    },
    {
      name: "Deluxe King Bed",
      image: "../RoomVariety/Deluxe-Twin/Deluxe Twin1.jpg",
      link: "#",
      size: "",
      occupancy: "",
      available: "",
      description: "",
    },
    {
      name: "Family Lakeside",
      image: "../RoomVariety/Deluxe-Twin/Deluxe Twin1.jpg",
      link: "#",
      size: "",
      occupancy: "",
      available: "",
      description: "",
    },
    {
      name: "Family Lakeside Plus",
      image: "../RoomVariety/Deluxe-Twin/Deluxe Twin1.jpg",
      link: "#",
      size: "",
      occupancy: "",
      available: "",
      description: "",
    },
    {
      name: "Family Lakeside Grand",
      image: "../RoomVariety/Deluxe-Twin/Deluxe Twin1.jpg",
      link: "#",
      size: "",
      occupancy: "",
      available: "",
      description: "",
    },
    {
      name: "Family Lake View",
      image: "../RoomVariety/Deluxe-Twin/Deluxe Twin1.jpg",
      link: "#",
      size: "",
      occupancy: "",
      available: "",
      description: "",
    },
  ];

  // Function to render room list dynamically
  function renderRooms() {
    const roomListContainer = document.getElementById("room-list");

    // Clear the container before adding new content
    roomListContainer.innerHTML = "";

    // Iterate through the rooms array and create HTML elements dynamically
    rooms.forEach((room) => {
      // Create the main room div
      const roomDiv = document.createElement("div");
      roomDiv.classList.add("rooms"); // Same class as in original HTML

      // Room image section
      const roomImageDiv = document.createElement("div");
      roomImageDiv.classList.add("room-image"); // Same class as in original HTML
      const roomImageLink = document.createElement("a");
      roomImageLink.href = room.link;
      const roomImage = document.createElement("img");
      roomImage.src = room.image;
      roomImage.alt = room.name;
      roomImageLink.appendChild(roomImage);
      roomImageDiv.appendChild(roomImageLink);

      // Room name and info section
      const roomNameDiv = document.createElement("div");
      roomNameDiv.classList.add("room-name"); // Same class as in original HTML
      const roomNameLink = document.createElement("a");
      roomNameLink.href = room.link;
      roomNameLink.innerHTML = `<b>${room.name}</b>`;
      roomNameDiv.appendChild(roomNameLink);
      const roomInfo = document.createElement("p");
      roomInfo.classList.add("room-info"); // Same class as in original HTML
      roomInfo.innerHTML = `Room Square Meters: <b>${room.size}</b><br>Max Occupancy: <b>${room.occupancy}</b><br>Amount of Rooms: <b>${room.available}</b>`;
      roomNameDiv.appendChild(roomInfo);
      const roomDescription = document.createElement("p");
      roomDescription.innerText = room.description;
      roomNameDiv.appendChild(roomDescription);

      // Append both parts (image and name) to the main room div
      roomDiv.appendChild(roomImageDiv);
      roomDiv.appendChild(roomNameDiv);

      // Append the room div to the room list container
      roomListContainer.appendChild(roomDiv);
    });
  }

  // Call the renderRooms function to display the rooms
  renderRooms();
});
