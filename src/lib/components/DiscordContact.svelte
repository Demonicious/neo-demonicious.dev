<script lang="ts">
    import { contact } from "$lib/stores";
    import { fly, fade } from "svelte/transition";

    function clickOutside(node) {
        const handleClick = event => {
            if (node && !node.contains(event.target) && !event.defaultPrevented) {
                node.dispatchEvent(
                    new CustomEvent('click_outside', node)
                )
            }
        }

        document.addEventListener('click', handleClick, true);
        
        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        }
    }

    let message = {
        loading: false,
        sent: false,
        error: false,
        username: '',
        content: ''
    };

    const send = async () => {
        if(!message.sent) {
            try {
                message.sent = false;
                message.error = false;
                message.loading = true;

                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/jso'
                    },
                    body: JSON.stringify({
                        username: message.username,
                        content: message.content
                    })
                });

                const data = await response.json();

                message.loading = false;

                if(data.success == true) {
                    message.sent = true;
                    message.username = '';
                    message.content = '';
                } else {
                    message.error = true;
                }
            } catch(e) {
                message.loading = false;
                message.sent = false;
                message.error = true;
            }
        }
    }
</script>

{#if $contact}
    <div class="outer">
        <div class="inner" use:clickOutside on:click_outside={() => $contact = false} in:fly={{ y: 50, duration: 150 }} out:fade={{ duration: 150 }}>
            <h3>Get in Touch</h3>
            <p>This message will go directly into my Discord Inbox.</p>

            <form on:submit|preventDefault={ send }>
                <input bind:value={ message.username } type="text" placeholder="Your Discord Username" />
                <textarea bind:value={ message.content } placeholder="Your message..." rows="4"></textarea>
                <input type="hidden" name="submit" value="true" />
                {#if message.loading}
                    <button class="success">Sending...</button>
                {:else if message.sent}
                    <button class="success">Sent!</button>
                {:else if message.error}
                    <button class="error">An Error Occured! Click to Resend</button>
                {:else}
                    <button>Submit</button>
                {/if}
            </form>
            
            <p>I will get back to you on discord.</p>
        </div>
    </div>
{/if}

<style>
    .outer {
        background: rgba(0, 0, 0, 0.8);
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: 500;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .inner {
        background-color: #1f242e;
        border: 1px solid #313745;
        border-radius: 0.5rem;
        padding: 0.8rem;
        z-index: 501;
        color: #d6dae3;
    }

    h3 {
        margin: 0;
        padding: 0;
    }

    form {
        margin-bottom: 0.8rem;
    }

    input[type=text], textarea {
        display: block;
        margin-top: 0.8rem;
        width: 100%;
        border-radius: 0.5rem;
        background-color: #1a1e25;
        border: 1px solid #313745;
        padding: 0.4rem 0.6rem;
        resize: none;
        color: #d6dae3;
    }

    button {
        padding: 0.5rem 2rem;
        border-radius: 0.5rem;
        margin-top: 0.8rem;
        background-color: rgb(110, 199, 110);
        border: none;
    }

    button.success {
        opacity: 0.4;
    }

    button.error {
        background-color: rgb(170, 49, 49);
        color: #d6dae3;
    }
</style>