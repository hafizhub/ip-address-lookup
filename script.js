const form = document.getElementById("ipForm");
        const statusMsg = document.getElementById("statusMsg");

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const ip = document.getElementById("userIP").value.trim();

            if (!ip) {
                statusMsg.textContent = "Please enter a valid IP address";
                statusMsg.className = "status error";
                return;
            }

            statusMsg.textContent = "Fetching IP details...";
            statusMsg.className = "status";

            try {
                const res = await fetch(`http://ip-api.com/json/${ip}`);
                const data = await res.json();

                if (data.status !== "success") {
                    throw new Error("Invalid IP address");
                }

                document.getElementById("myIP").textContent = data.query;
                document.getElementById("myISP").textContent = data.isp;
                document.getElementById("myLocation").textContent =
                    `${data.city}, ${data.regionName}, ${data.country}`;
                document.getElementById("myZip").textContent = data.zip || "N/A";
                document.getElementById("myTimeZone").textContent = data.timezone;

                statusMsg.textContent = "IP information loaded successfully";
            } catch (error) {
                statusMsg.textContent = "Unable to fetch IP details";
                statusMsg.className = "status error";
            }
        });